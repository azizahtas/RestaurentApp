
import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

const itemRoutes: Routes = [
    { path: 'Item', loadChildren: 'app/Item/item.module#ItemModule' },
];

const branchRoutes: Routes = [
    { path: 'Branch', loadChildren: 'app/Branch/branch.module#BranchModule' },
];

const bookingRoutes: Routes = [
    { path: 'Booking', loadChildren: 'app/Booking/booking.module#BookingModule' },
];

const userRoutes: Routes = [
    { path: 'User', loadChildren: 'app/User/user.module#UserModule' },
];

const dashboardRoutes: Routes = [
    { path: 'DashboardCenter', loadChildren: 'app/Dashboard/dashboard.module#DashboardModule' },
    { path: '', redirectTo: "/DashboardCenter", pathMatch: 'full' }
];



export const routes : Routes = [
    ...bookingRoutes,
    ...itemRoutes,
    ...branchRoutes,
    ...dashboardRoutes
];

export const appRoutingProviders:any[] = [

];

export const appRoutes:ModuleWithProviders = RouterModule.forRoot(routes);