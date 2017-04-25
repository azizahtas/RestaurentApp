import {Component} from "@angular/core";
import {Auth} from "../Auth/auth.service";
import {UserLogin, UserSignup} from "../User/user.modal";
import {UserService} from "../User/user.service";
@Component({
    selector : 'headerbar',
    templateUrl : './headerbar.component.html',
  styles:[`
.menuItems{
float:left; 
margin:-3px 0px 0px 10px; 
font-size:20px; 
padding:12px; 
color:#6E778C;
}
.menuItemSelected{
color: #5DCFF3;
}
`]
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
    loginSuccess : boolean = false;

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
                        this.loginSuccess = true;
                    }
                    else if(!data.success){
                        this.incorrect = true;
                      this.loginSuccess = false;
                    }
                },
                err => {
                    this.serverOffline = true;
                },
                ()=> {}
            )
    }
    public Signup(){
      this.CheckEmail(this.userSignup.local.email);
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
                this.loginSuccess = true;
              }
              else if(!data.success){
                this.incorrectSignup = true;
                this.loginSuccess = false;
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

    public logout(){
      this.loginSuccess = false;
      this._auth.Logout();
    }

    public ToggleActive(){
        this.active = !this.active;
    }

}
