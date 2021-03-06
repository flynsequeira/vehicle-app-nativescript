import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
const appSettings = require("application-settings");
import 'rxjs/Rx';


import { User } from "./user.model";
import { Config } from "../config";
import { RouterExtensions } from "nativescript-angular/router";

@Injectable()
export class UserService {
  constructor(private http: Http, private route: RouterExtensions) { }

  getToken(){
    return appSettings.getString("token");
  }

  setToken(token: String) {
    appSettings.setString("token", token);
  }

  removeToken() {
    appSettings.clear("token");
  }

  getAuthorizationHeader() {
    let headers = this.getCommonHeaders();
    headers.append("x-auth", this.getToken());
    return headers;
  }

  getUserData(): Observable<boolean> {
    
    var getUserDataUrl = Config.apiUrl + "api/users/me";
    let opts = { headers: this.getAuthorizationHeader() };
    return this.http.get(getUserDataUrl, opts)
      .map((response)=>{
        console.log(response);
        Config['user'] = response;
        return response.json()
      }).catch((err)=>{
        return this.handleErrors(err);
      })
      // .pipe(
      //   map(response => {
      //     Config['user'] = response;
      //     return response.json()
      //   }),
      //   catchError(this.handleErrors)
      // );
  }

  register(user: User) {
    console.log(Config.apiUrl + "api/users/register");
    return this.http.post(
      Config.apiUrl + "api/users/register",
      {
        email: user.email,
        password: user.password
      },
      { headers: this.getCommonHeaders() }
    ).pipe(
      map(response => {
        console.log('came to map');
        this.setToken(response.json()['token'])
        return response.json()['user'];
      }),
      catchError(this.handleErrors)
    );
  }

  fbRegister(user: User, token: Object) {
    return this.http.post(
      Config.apiUrl + "api/users/register/fb",
      {
        user,
        token
      },
      { headers: this.getCommonHeaders() }
    ).pipe(
      map(response => {
        this.setToken(response.json()['token'])
        return response.json()['user'];
      }),
      catchError(this.handleErrors)
    );
  }

  fbResult(token: String) {
    return this.http.post(
      Config.apiUrl + "api/users/check/fb",
      JSON.stringify({
        token: token
      }), 
      { headers: this.getCommonHeaders() }
    ).toPromise().then((response)=>{
      return response.json()['user_exists'];
    })
  }

  login(user: User) {
    return this.http.post(
      Config.apiUrl + "api/users/login",
      JSON.stringify({
        email: user.email,
        password: user.password
      }),
      { headers: this.getCommonHeaders() }
    ).pipe(
      map(response => {
        this.setToken(response.json()['token'])
        return response.json()['user'];
      }),
      catchError(this.handleErrors)
    );
  }

  logout(){
    this.removeToken();
    this.route.navigate(['login']);
  }

  getCommonHeaders() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    // headers.append("Authorization", Config.authHeader);
    return headers;
  }

  handleErrors(error: Response) {
    console.log('errors: ');
    console.log(error);
    return throwError(error);
  }
}