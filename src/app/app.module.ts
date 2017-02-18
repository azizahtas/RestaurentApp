import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {DashboardModule} from "./Dashboard/dashboard.module";
import {appRoutes, appRoutingProviders} from "./app.routes";
import {ItemModule} from "./Item/item.module";
import {CoreModule} from "./Core/core.module";
import {BranchModule} from "./Branch/branch.module";
import {UserModule} from "./User/user.module";
import {BookingModule} from "./Booking/booking.module";
import {Auth} from "./Auth/auth.service";
import {AuthGuard} from "./Auth/auth-guard.service";
import {UserService} from "./User/user.service";
import {AuthModule} from "./Auth/auth.module";

@NgModule({
    imports : [appRoutes,DashboardModule,ItemModule,BranchModule,CoreModule,BookingModule,UserModule,AuthModule],
    declarations : [AppComponent],
    providers : [appRoutingProviders,Auth,AuthGuard,UserService],
    bootstrap : [AppComponent]
})
export class AppModule{}