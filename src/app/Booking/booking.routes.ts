import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookingComponent} from "./booking.component";
import {BookingCenterComponent} from "./bookingCenter.component";

const BookingRoutes: Routes = [
    {
        children: [
            { path: 'Booking', component: BookingComponent },
            { path: '', redirectTo: "/Booking", pathMatch: 'full' }
        ],
        path: '',
        component: BookingCenterComponent

    }
];

export const BookingRouting: ModuleWithProviders = RouterModule.forChild(BookingRoutes);