import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Vehicle } from "./vehicle.model";
import { Config } from "../config";
import { UserService } from "../user/user.service";

@Injectable()
export class VehicleService {
  constructor(private http: Http, private userService: UserService) { }


  load(): Observable<Array<Vehicle>> {
    var getUserDataUrl = Config.apiUrl + "api/vehicles";
    let opts = { headers: this.userService.getAuthorizationHeader() };
    return this.http.get(getUserDataUrl, opts)
      .pipe(
        map(response => {
          return response.json();
        }),
        catchError(this.userService.handleErrors)
      );
  }
  getVehicle(id): Observable<Vehicle>{
    var getUserDataUrl = Config.apiUrl + "api/vehicles/"+String(id);
    let opts = { headers: this.userService.getAuthorizationHeader() };
    return this.http.get(getUserDataUrl, opts)
      .pipe(
        map(response => {
          return response.json();
        }),
        catchError(this.userService.handleErrors)
      );
  }
  save(vehicle): Observable<Object>{
    var getUserDataUrl = Config.apiUrl + "api/vehicles/save";
    let opts = { headers: this.userService.getAuthorizationHeader() };
    return this.http.post(getUserDataUrl,vehicle, opts)
      .pipe(
        map(response => {
          return response.json();
        }),
        catchError(this.userService.handleErrors)
      );
  }

}