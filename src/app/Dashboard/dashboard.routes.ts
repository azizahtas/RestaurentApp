import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {DashboardCenterComponent} from "./dashboardCenter.component";

const dashboardRoutes: Routes = [
    {
        children: [
            { path: 'Dashboard', component: DashboardComponent },
            { path: '', redirectTo: "/Dashboard", pathMatch: 'full' }
        ],
        path: '',
        component: DashboardCenterComponent

    }
];

export const dashboardRouting: ModuleWithProviders = RouterModule.forChild(dashboardRoutes);
