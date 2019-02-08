/* Protects routes from unauthenticated users */
import { Injectable } from '@angular/core';
import { Router,ActivatedRoute, CanActivate, CanActivateChild } from '@angular/router';
import { UserService } from './user/user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) {}

  canActivate() {
    if (this.userService.getToken()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild() {
    if (this.userService.getToken())
      return true;
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
