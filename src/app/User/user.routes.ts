import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from "./user.component";
import {UserCenterComponent} from "./userCenter.component";
import {AuthGuard} from "../Auth/auth-guard.service";

const UserRoutes: Routes = [
    {
        children: [
            { path: 'User', component: UserComponent },
            { path: '', redirectTo: "/User", pathMatch: 'full' }
        ],
        path: '',
        component: UserCenterComponent,
        canActivate : [AuthGuard]

    }
];

export const UserRouting: ModuleWithProviders = RouterModule.forChild(UserRoutes);