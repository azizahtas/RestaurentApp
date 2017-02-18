import {Component} from "@angular/core";
import {Auth} from "../Auth/auth.service";
import {UserLogin, UserSignup} from "../User/user.modal";
import {UserService} from "../User/user.service";
@Component({
    selector : 'headerbar',
    templateUrl : './headerbar.component.html'
})
export class HeaderBarComponent{
//assets/plugins/LoginSignUpForm/loginsignup.css
    constructor(public _auth:Auth, public _user:UserService){}

    user : UserLogin = new UserLogin();
    userSignup : UserSignup = new UserSignup();
    temp :string = "";

    incorrect : boolean = false;
    incorrectSignup : boolean = false;
    serverOffline : boolean = false;
    active: boolean = false;

    checking_Email : boolean = false;
    checking_Email_Error : boolean = false;

    public Login(){
        var newUser = new UserLogin();
        newUser.email = this.user.email;
        newUser.password = this.user.password;
        this._user.login(newUser)
            .subscribe(
                data =>{
                    this.serverOffline = false;
                    if(data.success){
                        this.incorrect = false;
                        var token = data.data;
                        localStorage.setItem('token', token);
                    }
                    else if(!data.success){
                        this.incorrect = true;
                    }
                },
                err => {
                    this.serverOffline = true;
                },
                ()=> {}
            )
    }
    public Signup(){
        var newuser = new UserSignup();
        newuser.local.email = this.userSignup.local.email;
        newuser.local.password = this.userSignup.local.password;
        newuser.otherDetails.fname= this.userSignup.otherDetails.fname;
        newuser.otherDetails.lname= this.userSignup.otherDetails.lname;
        newuser.otherDetails.phone= this.userSignup.otherDetails.phone;
        this._user.signup(newuser)
            .subscribe(
                data => {
                    this.serverOffline = false;
                    if(data.success){
                        this.incorrectSignup = false;
                        var token = data.data;
                        localStorage.setItem('token', token);
                    }
                    else if(!data.success){
                        this.incorrectSignup = true;
                    }
                },
                err => {
                    this.serverOffline = true; 
                },
                () => {}
            )
    }
    public CheckEmail(email : String){
        this.checking_Email = true;
        this.serverOffline = false;
        this._user.checkUser(email)
            .subscribe(
                data =>{
                    this.checking_Email_Error = data.success;
                },
                err =>{this.serverOffline = true;},()=>{this.checking_Email = false;}
            )
    }

    public ToggleActive(){
        this.active = !this.active;
    }

}