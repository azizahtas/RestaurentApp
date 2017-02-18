import { Component } from '@angular/core';
import { Branch, BranchSearchModel, LocationModal, TableModal } from "../Branch/branch.modal";
import { Message } from "../Shared/Message.modal";
import { BranchService } from "../Branch/branch.service";
import { Category } from "../Category/category.modal";
import * as _ from "lodash"
import { Auth } from "../Auth/auth.service";
import { UserService } from "../User/user.service";
import { BookingService } from "../Booking/booking.service";
import { UserSignup } from "../User/user.modal";
import { TimeSlotService } from "../TimeSlot/timeslot.service";
import { TimeSlot, TimeSlotViewModal } from "../TimeSlot/timeslot.modal";
import { Booking, BookingSearchModal } from "../Booking/booking.modal";
import { CalendarModule } from 'primeng/primeng';

@Component({
    selector: 'booking',
    templateUrl: './booking.component.html',
})
export class BookingComponent {
    constructor(private _bran: BranchService, public _auth: Auth,
        private _user: UserService, private _timeslot: TimeSlotService,
        private _book: BookingService) { }

    searchedBooking: BookingSearchModal;
    selectedBranch: Branch;

    Branches: Branch[];
    TimeSlots: TimeSlot[];
    messages: Message[];
    Bookings: Booking[];
    searchedBookings : Booking[];

    serverOffline: boolean = false;

    public today: Date;

    ngOnInit() {
        this.messages = [];
        this.Branches = [];
        this.TimeSlots = [];
        this.Bookings = [];
        this.searchedBookings = [];

        this.searchedBooking = new BookingSearchModal();
        this.selectedBranch = new Branch();

        this.today = new Date();

        this.getAllBranches();
        this.getAllTimeSlots();
        if(this._auth.isAdmin || this._auth.isManager){
            this.getAllBookings();
        }
        else{
             this.getBookingsWithUserId(this._auth.getId());
        }
    }

    public branchSelected(branch:Branch){
        console.log("Got In");
        this.selectedBranch = branch;
        console.log("Going Out");
        console.log(this.selectedBranch);
    }

    getAllBranches() {
        this._bran.getAllBranches()
            .subscribe(
            data => {
                if (data.success) {
                    this.Branches = data.data;
                }
            },
            err => { },
            () => { }
            )
    }
    getAllTimeSlots() {
        this._timeslot.getAllTimeSlots()
            .subscribe(
            data => {
                if (data.success) {
                    this.TimeSlots = data.data;
                }
            },
            err => { },
            () => { }
            )
    }
    getAllBookings() {
        this._book.getAllBookings()
            .subscribe(
            data => {
                if (data.success) {
                    this.Bookings = data.data;
                    this.searchedBookings = this.Bookings;
                }
            },
            err => {
                this.serverOffline = true;
            },
            () => { }
            )
    }
    getBookingsWithUserId(Id:string) {
        this._book.getBookingsByUserId(Id)
            .subscribe(
            data => {
                if (data.success) {
                    this.Bookings = data.data;
                    this.searchedBookings = this.Bookings;
                }
            },
            err => {
                this.serverOffline = true;
            },
            () => { }
            )
    }

}
