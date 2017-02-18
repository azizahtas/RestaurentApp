export class Booking{
    _id : string;
    _UserId : string;
    _BranchId : string;
    _TableId : string;
    TNo : number;
    Date : string;
    _TimeSlotId : string;
    NoOfPersons : number;
    Orders : Order[];
    Canceled : boolean;

    constructor(){
        this._UserId = "";
        this._BranchId = "";
        this._TableId = "";
        this.TNo = null;
        this.Date = "";
        this._TimeSlotId = "";
        this.NoOfPersons = null;
        this.Orders = [];
        this.Canceled = false;
    }
}

export class Order {
    _MenuId : string;
    constructor(){
        this._MenuId = "";
    }
}

export class BookingSearchModal{
    Date : Date;
    _BranchId : string;
    _TableId : string;
    _UserId : string;
    _TimeSlotId : string;
    FName : string;
    LName : string;
    Canceled : string;
    constructor(){
        this._UserId = "";
        this._BranchId = "";
        this._TableId = "";
        this.Date = new Date();
        this._TimeSlotId = "";
        this.FName = "";
        this.LName = "";
        this.Canceled = "A";
    }
}