import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./shared/auth-guard.service";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full", canActivate: [AuthGuard] },
    { path: "home", loadChildren: "~/app/home/home.module#HomeModule", canActivate: [AuthGuard] },
    { path: "browse", loadChildren: "~/app/browse/browse.module#BrowseModule", canActivate: [AuthGuard] },
    { path: "search", loadChildren: "~/app/search/search.module#SearchModule", canActivate: [AuthGuard] },
    { path: "featured", loadChildren: "~/app/featured/featured.module#FeaturedModule", canActivate: [AuthGuard] },
    { path: "settings", loadChildren: "~/app/settings/settings.module#SettingsModule", canActivate: [AuthGuard] },
    { path: "login", component: LoginComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
