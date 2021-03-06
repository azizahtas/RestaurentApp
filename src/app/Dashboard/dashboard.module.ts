import { NgModule } from '@angular/core';
import {dashboardRouting} from "./dashboard.routes";
import {DashboardCenterComponent} from "./dashboardCenter.component";
import {DashboardComponent} from "./dashboard.component";
import {SharedModule} from "../Shared/shared.module";

@NgModule({
    imports: [SharedModule,dashboardRouting],
    declarations: [
        DashboardCenterComponent,
        DashboardComponent,
    ]
})
export class DashboardModule { }
