export class Branch {
    _id : string;
    Name : string;
    Address : string;
    Location : LocationModal;
    Tables : TableModal[];
    Img_Url : string;
    constructor(){
      this._id = null;
        this.Name = "";
        this.Address = "";
        this.Location = new LocationModal();
        this.Tables = [];
        this.Img_Url = "";
    }
}

export class LocationModal{
    _id : string;
    Label : string;
    Lat : string;
    Long:string;
    constructor(){
      this._id = null;
        this.Label = "";
        this.Lat = "";
        this.Long = "";
    }
}
export class TableModal{
    _id:string;
    TNo: number;
    Cap: number;
    Img_Url: string;
    Note : string;
}

export class BranchSearchModel {
    Name:string;
    Address:string;
    constructor(){
        this.Name = "";
        this.Address = "";
    }
}
