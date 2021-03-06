import { Component, OnInit } from '@angular/core';
import { User } from "../shared/user/user.model";
import { UserService } from "../shared/user/user.service";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { AuthService } from '../shared/auth.service';
import { topmost } from "tns-core-modules/ui/frame";
import { ITnsOAuthTokenResult } from "nativescript-oauth2";

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})

export class LoginComponent implements OnInit {
  user: User;
  isLoggingIn = true;
  addEmail = false;
  token; 

  constructor(private page: Page, private router: Router, private userService: UserService, private authService: AuthService) {
    this.user = new User();
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.backgroundSpanUnderStatusBar = true;
  }

  facebookSignUp(){
    this.userService.fbRegister(this.user,this.token).subscribe(
      () => {
        alert("Your account was successfully created!");
        setTimeout(() => { this.router.navigate(["/home"]) }, 2000)
        // this.toggleDisplay();
      },
      (error) => alert("Invalid user and password")
    );
  }

  submit() {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  facebookLogin() {
    const fram = topmost();
    this.authService
      .tnsOauthLogin("facebook")
      .then((result: ITnsOAuthTokenResult) => {
        return this.userService.fbResult(result['accessToken']).then((fbCheck)=>{
          if(fbCheck){
            console.log('doing facebook login');
            this.token = result;
            this.userService.setToken(result['accessToken']);
            setTimeout(() => { this.router.navigate(["/home"]) }, 2000)
          } else {
            this.token = result;
            this.addEmail = true
          }
        })
        
      });
  }
  googleLogin() {
    const fram = topmost();
    this.authService
      .tnsOauthLogin("google")
      .then((result: ITnsOAuthTokenResult) => {
        console.log(result);
        console.log("back to app component with token" + result.accessToken);
      });
  }

  login() {
    // TODO: Define
    this.userService.login(this.user)
      .subscribe(
        () => {
          alert("Your account was successfully created!");
          setTimeout(() => { this.router.navigate(["/home"]) }, 2000)
          // this.toggleDisplay();
        },
        (error) => alert("Invalid user and password")
      );
  }

  signUp() {
    this.userService.register(this.user)
      .subscribe(
        () => {
          alert("Your account was successfully created!");
          setTimeout(() => { this.router.navigate(["/home"]) }, 2000)
        },
        (error) => alert("Invalid user and password")
      );
  }
  
  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
}