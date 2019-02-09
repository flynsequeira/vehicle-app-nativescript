import { Component, OnInit } from '@angular/core';
import { User } from "../shared/user/user.model";
import { UserService } from "../shared/user/user.service";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})

@Component({
  selector: "gr-login",
  templateUrl: "login/login.component.html",
  styleUrls: ["login/login.component.css"]
})
export class LoginComponent implements OnInit {
  user: User;
  isLoggingIn = true;

  constructor(private page: Page, private router: Router, private userService: UserService) {
    this.user = new User();
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.backgroundSpanUnderStatusBar = true;
    this.user['email']='someemail@gmail.com';
    this.user['password']='passmein';
  }

  submit() {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
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