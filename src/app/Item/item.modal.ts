export class MenuItem {
    _id : string;
    Name : string;
    HPrice : number;
    FPrice : number;
    Desc : string;
    Img_Url : string;
    Category : string;
    Type : string;

    constructor(){
        this.Name = "";
        this.HPrice = 0;
        this.FPrice = 0;
        this.Desc = "";
        this.Img_Url = "";
        this.Category = "";
        this.Type = "";
    }
}

export class MenuItemSearchModel{
    Name : string;
    Price : number;
    Category : string;
    Type : string;
    constructor(){
        this.Name = "";
        this.Price = 0;
        this.Category = "";
        this.Type = "";
    }
}
