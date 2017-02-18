// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { BookingComponent } from './booking.component';
import { BookingCenterComponent } from './bookingCenter.component';
import { BookingService } from './booking.service';
import { SharedModule } from '../Shared/shared.module';
import { BookingRouting } from './booking.routes';
import {BranchService} from "../Branch/branch.service";
import {TimeSlotService} from "../TimeSlot/timeslot.service";
import {CalendarModule} from "primeng/primeng";

@NgModule({
    imports: [SharedModule,BookingRouting,CalendarModule],
    declarations: [
        BookingCenterComponent,
        BookingComponent,
    ],
    providers : [BranchService,TimeSlotService,BookingService]
})
export class BookingModule {

}
