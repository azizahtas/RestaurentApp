import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {DashboardPointsComponent} from "./dashboardPoints.component";
import {DashboardCenterComponent} from "./dashboardCenter.component";

const dashboardRoutes: Routes = [
    {
        children: [
            { path: 'Dashboard', component: DashboardComponent },
            { path: 'DashboardPoints', component: DashboardPointsComponent },
            { path: '', redirectTo: "/Dashboard", pathMatch: 'full' }
        ],
        path: '',
        component: DashboardCenterComponent

    }
];

export const dashboardRouting: ModuleWithProviders = RouterModule.forChild(dashboardRoutes);