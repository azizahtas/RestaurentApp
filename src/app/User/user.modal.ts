/*
* Ohh Plz! I was not "staring" i was just Looking! And i was not just looking at you I was looking all of you guys having fun coz i was just sitting getting boored!
 You have like greatly misunderstood my intentions!
 God bless that guy who would really stare at you intentionaly
* */
export class UserLogin {
     email : string;
     password : string;
 constructor(){
     this.email = "";
     this.password = "";
 }
}
export class UserLoginFacebook{
     id : string ;
     email : string;
     token : string;
     name : string;
 constructor(){
     this.id = "";
     this.email = "";
     this.token = "";
     this.name = ""; 
 }
}
export class UserLoginTwitter{
     id : string ;
     email : string;
     token : string;
     name : string;
 constructor(){
     this.id = "";
     this.email = "";
     this.token = "";
     this.name = ""; 
 }
}
export class UserLoginGoogle{
     id : string ;
     email : string;
     token : string;
     name : string;
 constructor(){
     this.id = "";
     this.email = "";
     this.token = "";
     this.name = ""; 
 }
}

export class UserSignup{
    _id: string;
    local : UserLogin;
    facebook :UserLoginFacebook;
    twitter : UserLoginTwitter;
    google : UserLoginGoogle;
    otherDetails : OtherDetails;
    constructor(){
        this.local = new UserLogin();
        this.facebook = new UserLoginFacebook();
        this.twitter = new UserLoginTwitter();
        this.google = new UserLoginGoogle();
        this.otherDetails = new OtherDetails();
    }
}

export class OtherDetails{
    who : boolean;
    bm : boolean;
    fname : string;
    lname : string;
    phone : string;
    _branchId : string;
    constructor(){
        this.who = false;
        this.bm = false;
        this.fname = "";
        this.lname = "";
        this.phone = "";
        this._branchId = "";
    }
}

export class UserViewModal{
    _Id : string;
    who : boolean;
    bm : boolean;
    fname : string;
    lname : string;
    phone : string;
    _branchId : string;
    constructor(){
        this._Id = "";
        this.who = false;
        this.bm = false;
        this.fname = "";
        this.lname = "";
        this.phone = "";
        this._branchId = "";
    }
}

export class UserSearchModal{
    FName : string;
    LName : string;
    constructor(){
        this.FName = "";
        this.LName = "";
    }
}

