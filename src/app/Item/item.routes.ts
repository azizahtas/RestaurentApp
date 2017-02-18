import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ItemComponent} from "./Item.component";
import {ItemCenterComponent} from "./ItemCenter.component";

const ItemRoutes: Routes = [
    {
        children: [
            { path: 'Item', component: ItemComponent },
            { path: '', redirectTo: "/Item", pathMatch: 'full' }
        ],
        path: '',
        component: ItemCenterComponent

    }
];

export const ItemRouting: ModuleWithProviders = RouterModule.forChild(ItemRoutes);