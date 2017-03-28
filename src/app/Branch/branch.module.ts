import { NgModule } from '@angular/core';
import {BranchRouting} from "./branch.routes";
import {BranchCenterComponent} from "./branchCenter.component";
import {BranchComponent} from "./branch.component";
import {SharedModule} from "../Shared/shared.module";
import {BranchService} from "./branch.service";
import {TimeSlotService} from "../TimeSlot/timeslot.service";
import {BookingService} from "../Booking/booking.service";
import {CalendarModule, CheckboxModule, GMapModule, DialogModule} from "primeng/primeng";

@NgModule({
    imports: [SharedModule,BranchRouting,CalendarModule,GMapModule,DialogModule,CheckboxModule],
    declarations: [
        BranchCenterComponent,
        BranchComponent
    ],
    providers : [BranchService,TimeSlotService,BookingService]
})
export class BranchModule { }
