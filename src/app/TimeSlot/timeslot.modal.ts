export class TimeSlot {
    _id : string;
    StartTime : string;
    EndTime : string;

    constructor(){
        this.StartTime = "";
        this.EndTime = "";        
    }
}

export class TimeSlotViewModal {
    _id : string;
    StartTime : string;
    EndTime : string;
    Disabled : boolean;

    constructor(){
        this.StartTime = "";
        this.EndTime = "";     
        this.Disabled = false;   
    }
}
