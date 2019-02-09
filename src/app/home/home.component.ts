import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ListViewEventData } from "nativescript-ui-listview";
import { Subscription } from "rxjs";
import { RouterExtensions } from "nativescript-angular/router";
import { VehicleService } from "../shared/vehicle/vehicle.service";
import { ActivatedRoute } from "@angular/router";
import { Vehicle } from "../shared/vehicle/vehicle.model";

@Component({
    selector: "Home",
    moduleId: module.id,
    providers: [VehicleService],
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css'],

})

export class HomeComponent implements OnInit {
  cars: Array<Vehicle>;

  constructor(private _routerExtensions: RouterExtensions, private vehicleService: VehicleService,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.vehicleService.load().subscribe((vehicles)=>{
      this.cars = vehicles;
    })
  }

//   Implement this everywhere else
  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}

  onCarItemTap(args: ListViewEventData){
    const tappedCarItem = args.view.bindingContext;
    this._routerExtensions.navigate(["edit-vehicle",tappedCarItem._id], {
      relativeTo: this.route,
      clearHistory: true,
      animated: true,
      transition: {
        name: "slideBottom",
        duration: 200,
        curve: "ease"
      }
    });
  }

  addNew(){
    this._routerExtensions.navigate(["add-vehicle"], {
      relativeTo: this.route,
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
