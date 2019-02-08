import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
const appSettings = require("application-settings");


import { User } from "./user.model";
import { Config } from "../config";

@Injectable()
export class UserService {
  constructor(private http: Http) { }

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
      .pipe(
        map(response => {
          Config['user'] = response;
          return response.json()
        }),
        catchError(this.handleErrors)
      );
  }

  register(user: User) {

    return this.http.post(
      Config.apiUrl + "api/users/register",
      {
        email: user.email,
        password: user.password
      },
      { headers: this.getCommonHeaders() }
    ).pipe(
      map(response => {
        console.log(response.json()['token']);
        this.setToken(response.json()['token'])
        return response.json()['user'];
      }),
      catchError(this.handleErrors)
    );
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
        this.setToken(response.headers.toJSON()['x-auth'][0])
        return response.json();
      }),
      catchError(this.handleErrors)
    );
  }

  logout(){
    return this.removeToken();
  }

  getCommonHeaders() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    // headers.append("Authorization", Config.authHeader);
    return headers;
  }

  handleErrors(error: Response) {
    console.log('error');
    console.log(error);
    return throwError(error);
  }
}