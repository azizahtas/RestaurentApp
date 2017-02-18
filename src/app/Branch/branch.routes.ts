import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BranchComponent} from "./branch.component";
import {BranchCenterComponent} from "./branchCenter.component";

const BranchRoutes: Routes = [
    {
        children: [
            { path: 'Branch', component: BranchComponent },
            { path: '', redirectTo: "/Branch", pathMatch: 'full' }
        ],
        path: '',
        component: BranchCenterComponent

    }
];

export const BranchRouting: ModuleWithProviders = RouterModule.forChild(BranchRoutes);