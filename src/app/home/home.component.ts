import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ListViewEventData } from "nativescript-ui-listview";
import { Subscription } from "rxjs";
import { RouterExtensions } from "nativescript-angular/router";




@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css'],

})

export class HomeComponent implements OnInit {
  cars: Array<Object>;

  constructor(private _routerExtensions: RouterExtensions) { }

  ngOnInit() {
    this.cars = [{
      _id: '0939939dkjdno30ojnowfuo23',
      make:'Ford',
      model:'Icon',
      model_year:'2008',
      mileage:5,
      imageUrl:'https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/cars/Ford_Ikon/1/Ford_Ikon_sedan_L_1.jpg',
      colour:'red',
      chassis_no:'1000487MLTK04',
      purchased_year:'2009'
    }]
  }

//   Implement this everywhere else
  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}

  onCarItemTap(args: ListViewEventData){
    const tappedCarItem = args.view.bindingContext;
    console.log(tappedCarItem)
    this._routerExtensions.navigate(["edit-car","3"], {
      clearHistory: true,
      animated: true,
      transition: {
        name: "slideBottom",
        duration: 200,
        curve: "ease"
      }
    });
  }

}
