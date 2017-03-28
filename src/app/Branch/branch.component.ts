/// <reference path="../../../typings/globals/google.maps/index.d.ts" />
import {Component, OnInit} from '@angular/core';
import { Branch, BranchSearchModel, LocationModal, TableModal } from "./branch.modal";
import { Message } from "../Shared/Message.modal";
import { BranchService } from "./branch.service";
//import {Message} from 'primeng/primeng';
//import {} from '@types/googlemaps';
import * as _ from "lodash"
import { Auth } from "../Auth/auth.service";
import { UserService } from "../User/user.service";
import { BookingService } from "../Booking/booking.service";
import { UserSignup } from "../User/user.modal";
import { TimeSlotService } from "../TimeSlot/timeslot.service";
import { TimeSlot, TimeSlotViewModal } from "../TimeSlot/timeslot.modal";
import { Booking } from "../Booking/booking.modal";

@Component({
    templateUrl: './branch.component.html',
    styles: [`
      .image {
    position: relative;
    width: 100%; /* for IE 6 */
}

.cap {
    position: absolute;
    top: 200px;
    left: 0;
    width: 100%;
}
.err{
padding: 5px;
}
.ui-inputtext {
    font-size : 20px !important;
}
`]
})
export class BranchComponent implements OnInit{
    constructor(private _bran: BranchService, public _auth: Auth,
        private _user: UserService, private _timeslot: TimeSlotService,
        private _book: BookingService) { }

    BranchAdd: Branch;
    BranchEdit: Branch;
    BranchDelete: Branch;
    BranchView: Branch;
    TableAdd: TableModal;
    TableEdit: TableModal;
    TableDelete: TableModal;
    selectedTable: TableModal;
    searchModal: BranchSearchModel;
    userSignup: UserSignup = new UserSignup();
    Booking: Booking;

    lastTableNo: number = 0;

    Branches: Branch[];
    TimeSlots: TimeSlot[];
    CheckedTimeSlot: TimeSlotViewModal[];
    searchedBranches: Branch[];
    messages: Message[];
    NonCanceledBookings: Booking[];

    incorrect: boolean = false;
    incorrectSignup: boolean = false;
    serverOffline: boolean = false;

    checking_Name: boolean = false;
    checking_Name_Error: boolean = false;
    view_Details: boolean = false;
    checking_TNo_Error: boolean = false;
    checking_Email: boolean = false;
    checking_Email_Error: boolean = false;

    public temp: string = "";
    public today: Date;
    public minDate: Date;
    public maxDate: Date;

  // *********************************************** //
 /* options: any;

  overlays: any[];

  dialogVisible: boolean;

  markerTitle: string;

  selectedPosition: any;

  infoWindow: any;

  draggable: boolean;

  msgs: any = [];*/
  //********************************************/
    ngOnInit() {
        this.Branches = [];
        this.TimeSlots = [];
        this.NonCanceledBookings = [];
        this.CheckedTimeSlot = [];


        this.BranchAdd = new Branch();
        this.BranchEdit = new Branch();
        this.BranchDelete = new Branch();
        this.BranchView = new Branch();
        this.searchModal = new BranchSearchModel();
        this.selectedTable = new TableModal();

        this.TableAdd = new TableModal();
        this.TableEdit = new TableModal();
        this.TableDelete = new TableModal();
        this.Booking = new Booking();

        this.today = new Date();
        this.minDate = new Date();
        this.maxDate = new Date();
        this.minDate.setMonth(this.today.getMonth());
        this.maxDate.setMonth(this.today.getMonth());
        this.maxDate.setDate(this.minDate.getDate() + 5);
        this.getAllBranches();
        this.getAllTimeSlots();
        this.getAllNonCanceledBookings();
    }
   /* ngAfterViewInit(){
      this.options = {
        center: {lat: 36.890257, lng: 30.707417},
        zoom: 12
      };
      this.initOverlays();
      this.infoWindow = new google.maps.InfoWindow();
    }*/
/*  handleMapClick(event) {
    this.dialogVisible = true;
    this.selectedPosition = event.latLng;
  }

  handleOverlayClick(event) {
    this.msgs = [];
    let isMarker = event.overlay.getTitle != undefined;

    if(isMarker) {
      let title = event.overlay.getTitle();
      this.infoWindow.setContent('' + title + '');
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());

      this.msgs.push({severity:'info', summary:'Marker Selected', detail: title});
    }
    else {
      this.msgs.push({severity:'info', summary:'Shape Selected', detail: ''});
    }
  }

  addMarker() {
    this.overlays.push(new google.maps.Marker({position:{lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng()}, title:this.markerTitle, draggable: this.draggable}));
    this.markerTitle = null;
    this.dialogVisible = false;
  }

  handleDragEnd(event) {
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Marker Dragged', detail: event.overlay.getTitle()});
  }

  initOverlays() {
    if(!this.overlays||!this.overlays.length) {
      this.overlays = [
        new google.maps.Marker({position: {lat: 36.879466, lng: 30.667648}, title:"Konyaalti"}),
        new google.maps.Marker({position: {lat: 36.883707, lng: 30.689216}, title:"Ataturk Park"}),
        new google.maps.Marker({position: {lat: 36.885233, lng: 30.702323}, title:"Oldtown"}),
        new google.maps.Circle({ center: new google.maps.LatLng(36.90707, 30.56533), fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500}),
      ];
    }
  }*/

    ViewDetails(branch: Branch) {
        this.BranchView = branch;
        this.view_Details = true;
        if (this.BranchView.Tables == undefined || this.BranchView.Tables.length <= 0) {
            this.lastTableNo = 0;
        }
        else {
            _.reverse(this.BranchView.Tables);
            this.lastTableNo = this.BranchView.Tables[0].TNo;
            _.reverse(this.BranchView.Tables);
        }
    }
    editBranch(branch: Branch) {
        this.BranchEdit._id = branch._id;
        this.BranchEdit.Name = branch.Name;
        this.BranchEdit.Address = branch.Address;
        this.BranchEdit.Img_Url = branch.Img_Url;
        this.BranchEdit.Location = branch.Location;
        this.BranchEdit.Tables = branch.Tables;
    }
    deleteBranch(branch: Branch) {
        this.BranchDelete._id = branch._id;
        this.BranchDelete.Name = branch.Name;
    }

    public CheckName(name: string) {
        this.checking_Name = false;
        this.checking_Name_Error = false;
        this._bran.checkName(name)
            .subscribe(
            data => {
                this.checking_Name = true;
                if (data.success && data.data == null) {
                    this.checking_Name = false;
                    this.checking_Name_Error = false;
                }
                else if (data.success && data.data != "") {
                    this.checking_Name_Error = true;
                    this.checking_Name = false;
                }
            }
            )
    }
    public Save(edit) {
        this.messages = [];
        if (!edit) {
            var newItm = new Branch();
            newItm.Name = this.BranchAdd.Name;
            newItm.Address = this.BranchAdd.Address;
            newItm.Img_Url = this.BranchAdd.Img_Url;
            newItm.Location = new LocationModal();
            newItm.Tables = [];
            this._bran.addBranch(newItm)
                .subscribe(
                data => {
                    if (data.success) {
                        this.messages.push({ type: 'success', title: this.BranchAdd.Name + ' Created Successfully!', message: '' });
                        this.getAllBranches();
                        this.BranchAdd.Name = "";
                        this.BranchAdd.Img_Url = "";
                        this.BranchAdd.Address = "";
                    }
                    else if (!data.success) {
                        this.messages.push({ type: 'danger', title: 'Error Occurred!', message: 'Something Went Wrong Server Side!' });
                    }
                },
                err => { },
                () => { this.checking_Name = false; this.checking_Name_Error = false; }
                )

        }
        else {
            this._bran.editBranch(this.BranchEdit)
                .subscribe(
                data => {
                    if (data.success) {
                        this.messages.push({ type: 'success', title: this.BranchEdit.Name + ' Saved Successfully!', message: '' });
                    }
                    else if (!data.success) {
                        this.messages.push({ type: 'danger', title: 'Error Occurred!', message: 'Something Went Wrong Server Side!' });
                    }
                },
                err => { },
                () => { this.checking_Name = false; this.checking_Name_Error =  false; }
                )
        }
    }
    public Delete(id: string) {
        this.messages = [];
        this._bran.deleteBranch(id)
            .subscribe(
            data => {
                if (data.success) {
                    this.messages.push({ type: 'success', title: this.BranchDelete.Name + ' Deleted Successfully!', message: '' });
                    this.getAllBranches();
                }
                else if (!data.success) {
                    this.messages.push({ type: 'danger', title: 'Error Occurred!', message: 'Something Went Wrong Server Side!' });
                }
            },
            err => { },
            () => { }
            )
    }

    CheckTableNo(TNo: number) {
        var b: boolean = false;
        _(this.BranchView.Tables).forEach(function (val: TableModal) {
            if (TNo == val.TNo) {
                b = true;
                return false;
            }
        });
        this.checking_TNo_Error = b;
    }
    editTable(table: TableModal) {
        this.TableEdit._id = table._id;
        this.TableEdit.TNo = table.TNo;
        this.TableEdit.Note = table.Note;
        this.TableEdit.Img_Url = table.Img_Url;
        this.TableEdit.Cap = table.Cap;
    }
    deleteTable(table: TableModal) {
        this.TableDelete._id = table._id;
        this.TableDelete.TNo = table.TNo;
    }

    public SaveTable(edit) {
        this.messages = [];
        if (!edit) {
            var newItm = new TableModal();
            newItm.TNo = this.TableAdd.TNo;
            newItm.Note = this.TableAdd.Note;
            newItm.Img_Url = this.TableAdd.Img_Url;
            newItm.Cap = this.TableAdd.Cap;
            this._bran.addTable(this.BranchView._id, newItm)
                .subscribe(
                data => {
                    if (data.success) {
                        this.messages.push({ type: 'success', title: 'TNo : ' + this.TableAdd.TNo + ' Created Successfully!', message: '' });
                        this.BranchView.Tables = data.data;
                    }
                    else if (!data.success) {
                        this.messages.push({ type: 'danger', title: 'Error Occurred!', message: 'Something Went Wrong Server Side!' });
                    }
                },
                err => { },
                () => { this.checking_TNo_Error = false; }
                )

        }
        else {
            this._bran.editTable(this.BranchView._id, this.TableEdit)
                .subscribe(
                data => {
                    if (data.success) {
                        this.messages.push({ type: 'success', title: 'TNo : ' + this.TableEdit.TNo + ' Saved Successfully!', message: '' });
                        this.BranchView.Tables = data.data;
                    }
                    else if (!data.success) {
                        this.messages.push({ type: 'danger', title: 'Error Occurred!', message: 'Something Went Wrong Server Side!' });
                    }
                },
                err => { },
                () => { this.checking_Name = false; this.checking_Name_Error = false; }
                )
        }
    }
    public DeleteTable(id: string) {
        this.messages = [];
        this._bran.deleteTable(this.BranchView._id, id)
            .subscribe(
            data => {
                if (data.success) {
                    this.messages.push({ type: 'success', title: 'TNo : ' + this.TableDelete.TNo + ' Deleted Successfully!', message: '' });
                    this.BranchView.Tables = data.data;
                }
                else if (!data.success) {
                    this.messages.push({ type: 'danger', title: 'Error Occurred!', message: 'Something Went Wrong Server Side!' });
                }
            },
            err => { },
            () => { }
            )
    }

    public selectTable(table: TableModal) {
        this.Booking = new Booking();
        this.selectedTable = table;
        this.Booking._TableId = this.selectedTable._id;
        this.Booking.TNo = this.selectedTable.TNo;
        this.Booking._BranchId = this.BranchView._id;
        if (this._auth.loggedIn()) {
            this.Booking._UserId = this._auth.getId();
            this.Booking._UserName = this._auth.getUserName();
        }
        this.resetCheckedTimeSlots();
        this.getAllNonCanceledBookings();
    }
    public CheckEmail(email: String) {
        this.checking_Email = true;
        this.serverOffline = false;
        this._user.checkUser(email)
            .subscribe(
            data => {
                this.checking_Email_Error = data.success;
            },
            err => { this.serverOffline = true; }, () => { this.checking_Email = false; }
            )
    }
    public BookTable(Signup: boolean) {
        this.messages = [];
        if (Signup) {
            var newuser = new UserSignup();
            newuser.local.email = this.userSignup.local.email;
            newuser.local.password = this.userSignup.local.password;
            newuser.otherDetails.fname = this.userSignup.otherDetails.fname;
            newuser.otherDetails.lname = this.userSignup.otherDetails.lname;
            newuser.otherDetails.phone = this.userSignup.otherDetails.phone;
            this._user.signup(newuser)
                .subscribe(
                data => {
                    this.serverOffline = false;
                    if (data.success) {
                        this.messages.push({ type: 'success', title: 'Signup Successful!!', message: 'Welcome ' + newuser.otherDetails.fname + ' ' + newuser.otherDetails.lname });
                        this.incorrectSignup = false;
                        var token = data.data;
                        localStorage.setItem('token', token);
                        this.Booking._UserId = this._auth.getId();
                        this._book.addBooking(this.Booking)
                            .subscribe(
                            data => {
                                if (data.success) {
                                    var date = new Date(this.Booking.Date);
                                    this.messages.push({ type: 'success', title: 'Your Table is Booked!', message: 'Table Booked At Date : ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' For ' + this.Booking.NoOfPersons + ' Persons!' });
                                }
                                else {
                                    this.messages.push({ type: 'danger', title: 'Try Booking Again! Sorry We Couldnt Book Your Table!', message: 'Error : ' + data.msg });
                                }
                            },
                            err => {
                                this.messages.push({ type: 'danger', title: 'Try Booking Again! Sorry We Couldnt Book Your Table!', message: 'Server Buisy!' });
                            },
                            () => { }
                            )
                    }
                    else if (!data.success) {
                        this.incorrectSignup = true;
                        this.messages.push({ type: 'danger', title: 'Something Went Wrong!', message: 'Error : ' + data.msg });
                    }
                },
                err => {
                    this.serverOffline = true;
                    this.messages.push({ type: 'danger', title: 'Try Again! Sorry We Couldnt Sign you up!!', message: 'Server Seems Buisy!' });
                },
                () => { }
                )
        }
        else {
            this._book.addBooking(this.Booking)
                .subscribe(
                data => {
                    if (data.success) {
                        var date = new Date(this.Booking.Date);
                        this.messages.push({ type: 'success', title: 'Your Table is Booked!', message: 'Table Booked At Date : ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' For ' + this.Booking.NoOfPersons + ' Persons!' });
                    }
                    else {
                        this.messages.push({ type: 'danger', title: 'Try Booking Again! Sorry We Couldnt Book Your Table!', message: 'Error : ' + data.msg });
                    }
                },
                err => {
                    this.messages.push({ type: 'danger', title: 'Try Booking Again! Sorry We Couldnt Book Your Table!', message: 'Server Buisy!' });
                },
                () => { }
                )
        }
    }
    public checkBookings() {
        this.Booking._TimeSlotId = "";
        for(var i=0; i<this.CheckedTimeSlot.length;i++){
            for(var j=0;j<this.NonCanceledBookings.length;j++){
                if(new Date(this.NonCanceledBookings[j].Date).valueOf() == new Date(this.Booking.Date).valueOf()
                && this.NonCanceledBookings[j]._TimeSlotId == this.CheckedTimeSlot[i]._id
                 && this.NonCanceledBookings[j]._TableId == this.selectedTable._id
                  && this.NonCanceledBookings[j]._BranchId == this.BranchView._id)
                    {
                      this.CheckedTimeSlot[i].Disabled = true;
                    }
            }
        }
    }

    BackToSearch() {
        this.view_Details = false;
    }
    ClearSearch() {
        this.searchModal.Address = "";
        this.searchModal.Name = "";
    }
    CompositSearch() {
        this.view_Details = false;
        let exp = this.generateExpression();
        if (exp != "") {
            let SrchItms: Branch[] = [];
            _(this.Branches).forEach(function (val: Branch) {
                if (eval(exp)) {
                    SrchItms.push(val);
                }
            });
            this.searchedBranches = [];
            this.searchedBranches = SrchItms;

            //this.setPages(this.searchdItems);
        }
        else if (exp == "") {
            this.getAllBranches();
        }

    }
    generateExpression(): string {
        let exp = "";
        if (this.searchModal.Name != "") {
            let patt = new RegExp(this.searchModal.Name, 'i');
            exp += patt + ".test(val.Name)||";
        }
        if (this.searchModal.Address != "") {
            let patt2 = new RegExp(this.searchModal.Address, 'i');
            exp += patt2 + ".test(val.Address)&&";
        }
        exp = exp.substr(0, exp.length - 2);
        return exp;
    }
    getAllBranches() {
        this._bran.getAllBranches()
            .subscribe(
            data => {
                if (data.success) {
                    this.Branches = data.data;
                    this.searchedBranches = this.Branches;
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
                    this.CheckedTimeSlot = [];
                    for(var i=0 ; i<  this.TimeSlots.length; i++){
                      var newTimeSlot = new TimeSlotViewModal();
                      newTimeSlot._id =  this.TimeSlots[i]._id;
                      newTimeSlot.StartTime =  this.TimeSlots[i].StartTime;
                      newTimeSlot.EndTime =  this.TimeSlots[i].EndTime;
                      this.CheckedTimeSlot.push(newTimeSlot);
                    }
                }
            },
            err => { },
            () => { }
            )
    }
    getAllNonCanceledBookings() {
        this._book.getBookings(false)
            .subscribe(
            data => {
                if (data.success) {
                    this.NonCanceledBookings = data.data;
                }
            },
            err => {
                this.serverOffline = true;
            },
            () => { }
            )
    }

    resetCheckedTimeSlots(){
         for(var i=0; i<this.CheckedTimeSlot.length;i++){
            this.CheckedTimeSlot[i].Disabled = false;
        }
    }

    allSlotsBooked():boolean{
        var booked = 0;
        for(var i=0; i<this.CheckedTimeSlot.length;i++){
            if(this.CheckedTimeSlot[i].Disabled == true) booked++;
        }
        return booked == this.CheckedTimeSlot.length
    }
}
