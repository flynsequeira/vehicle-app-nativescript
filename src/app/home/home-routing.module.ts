import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HomeComponent } from "./home.component";
import { UpsertVehicleComponent } from "./upsert-vehicle/upsert-vehicle.component";

const routes: Routes = [
    { path: "add-vehicle", component: UpsertVehicleComponent},
    { path: "edit-vehicle/:id", component: UpsertVehicleComponent},
    { path: "", component: HomeComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }
