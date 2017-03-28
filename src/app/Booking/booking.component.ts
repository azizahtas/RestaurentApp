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
    styles : [`
  .highlight{
    color: #d9534f;
  }
`]
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
   selectedBooking: Booking;
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
        this.selectedBooking = new Booking();

        this.today = new Date();

        this.getAllBranches();
        this.getAllTimeSlots();
        if(this._auth.isAdmin()){
            this.getAllBookings();
        }
        else if(this._auth.isManager()){
          this.getAllBookingsWithBranchId(this._auth.getBranchId());
        }
        else{
             this.getBookingsWithUserId(this._auth.getId());
        }
    }

    public branchSelected(branch : Branch){
     /* let selectedBranch : Branch = new Branch();
      let id = this.searchedBooking._BranchId;
      _(this.Branches).forEach(function (b:Branch) {
        if(b._id == id){
          selectedBranch = b;
        }
      });
        this.selectedBranch = selectedBranch;
      console.log(id);*/
     this.selectedBranch = branch;
      console.log(this.selectedBranch);
    }
    selectBooking(selected : Booking, i : number){
      this.selectedBooking = selected;
      this.selectedBooking.NoOfPersons = i; // Index of the Selected booking inside Bookings
    }

    searchCanceledBooking(){
      let canceledBookings : Booking[] = [];
      _(this.Bookings).forEach(function (a : Booking) {
        if(a.Canceled){
          canceledBookings.push(a);
        }
      });
      this.searchedBookings = canceledBookings;
    }
    searchArrivedBooking(){
      let arrivedBookings : Booking[] = [];
      _(this.Bookings).forEach(function (a : Booking) {
        if(a.Arrived){
          arrivedBookings.push(a);
        }
      });
      this.searchedBookings = arrivedBookings;
    }
    searchOpenBooking(){
      let openBookings : Booking[] = [];
      _(this.Bookings).forEach(function (a : Booking) {
        if(!a.Arrived && !a.Canceled){
          openBookings.push(a);
        }
      });
      this.searchedBookings = openBookings;
    }
  /*
 CompositSearch(){
    this.view_Details = false;
    let exp = this.generateExpression();
    if(exp!="") {
      let SrchItms:MenuItem[] = [];
      _(this.menuItems).forEach(function (val:MenuItem) {
        if (eval(exp)) {
          SrchItms.push(val);
        }
      });
      this.searchedMenuItems = [];
      this.searchedMenuItems = SrchItms;
      console.log("exp is "+exp);
      //this.setPages(this.searchdItems);
    }
    else if(exp==""){
      this.getAllMenuItems();
    }
  }
  generateExpression():string{
    let exp = "";
    if(this.searchedBooking.Date.toDateString()!=""){

     let d = new Date(this.searchedBooking.Date);
      exp += patt+".test(val.Name)&&";
    }
    if(this.searchModal.Category!=""){
      exp += "'"+this.searchModal.Category+"'==val.Category&&"
    }
    if(this.searchModal.Type!=""){
      exp += "'"+this.searchModal.Type+"'==val.Type&&"
    }
    if(this.searchModal.Price!=0){
      exp += "'val.FPrice<="+this.searchModal.Price+"'&&"
    }

    exp = exp.substr(0,exp.length-2);
    return exp;
  }
  */
    showAll(){
      this.searchedBookings = this.Bookings;
    }

    cancelBooking(Id:String){
      this._book.cancelBooking(Id)
        .subscribe(
          data => {
            if(data.success){
              this.messages.push({ type: 'success', title: 'Booking Canceled', message: 'Your Booking Was Canceled Successfully '});
              this.Bookings[this.selectedBooking.NoOfPersons].Canceled = true;
              this.Bookings[this.selectedBooking.NoOfPersons].Arrived = false;
            }
            else{
              this.messages.push({ type: 'danger', title: 'Booking Not Canceled', message: 'Your Booking Was Not Canceled!!!'});
            }
          },
          err => {
            this.serverOffline = true;
          },
          () =>{}
        )
    }
    arrivedBooking(Id:String){
      this._book.arrivedBooking(Id)
        .subscribe(
          data => {
            if(data.success){
              this.messages.push({ type: 'success', title: 'Arrived', message: 'Your Booking Was Set As Arrived Successfully '});
              this.Bookings[this.selectedBooking.NoOfPersons].Canceled = false;
              this.Bookings[this.selectedBooking.NoOfPersons].Arrived = true;
            }
            else{
              this.messages.push({ type: 'danger', title: 'Not Arrived', message: 'Your Booking Was Not Set As Arrived!!!'});
            }
          },
          err => {
            this.serverOffline = true;
          },
          () =>{}
        )
    }
    openBooking(Id:String){
      this._book.openBooking(Id)
        .subscribe(
          data => {
            if(data.success){
              this.messages.push({ type: 'success', title: 'Open', message: 'Your Booking Status Was Set To Open'});
              this.Bookings[this.selectedBooking.NoOfPersons].Canceled = false;
              this.Bookings[this.selectedBooking.NoOfPersons].Arrived = false;
            }
            else{
              this.messages.push({ type: 'danger', title: 'Not Open', message: 'Your Booking Status Could\'nt Be Set To Open!!!'});
            }
          },
          err => {
            this.serverOffline = true;
          },
          () =>{}
        )
    }

   getBranchName(branchId:String) : String {
     var Name : String = "";
        _(this.Branches).forEach(function (branch:Branch) {
          if(branch._id == branchId){
            Name = branch.Name;
          }
        });
      return Name;
    }
   getTimeSlotName(timeslotId:String) : String {
     var Name : String = "";
        _(this.TimeSlots).forEach(function (timeslot:TimeSlot) {
          if(timeslot._id == timeslotId){
            Name = timeslot.StartTime + " - " + timeslot.EndTime;
          }
        });
      return Name;
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
                    _.reverse(this.searchedBookings);
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
                  _.reverse(this.searchedBookings);
                }
            },
            err => {
                this.serverOffline = true;
            },
            () => { }
            )
    }
    getAllBookingsWithBranchId(Id:string) {
        this._book.getBookingsByBranchId(Id)
            .subscribe(
            data => {
                if (data.success) {
                    this.Bookings = data.data;
                    this.searchedBookings = this.Bookings;
                  _.reverse(this.searchedBookings);
                }
            },
            err => {
                this.serverOffline = true;
            },
            () => { }
            )
    }

}
