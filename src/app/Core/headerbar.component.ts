import {Component} from "@angular/core";
import {Auth} from "../Auth/auth.service";
import {UserLogin, UserSignup, PasswordResetModal, UserLoginGoogle} from "../User/user.modal";
import {UserService} from "../User/user.service";
declare const gapi: any;
//declare const FB:any;

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
    constructor(public _auth:Auth, public _user:UserService){};
  public auth2:any;
  private googleClientId:string = '103506144227-7kqf32ajt6dlf1mecho39tj02nu8d1dc.apps.googleusercontent.com';

    user : UserLogin = new UserLogin();
    userSignup : UserSignup = new UserSignup();
    forgotPassModal : PasswordResetModal = new PasswordResetModal();
    googleLogin : UserLoginGoogle = new UserLoginGoogle();
    temp :string = "";

    incorrect : boolean = false;
    incorrectSignup : boolean = false;
    serverOffline : boolean = false;
    active: boolean = false;
    loginSuccess : boolean = false;
    forgotPass : boolean = false;
    key : boolean = false;
    newPass : boolean = false;
  passwordResetSuccess : boolean = false;

    checking_Email : boolean = false;
    checking_Email_Error : boolean = false;

    passwordResetMessage : string = "";

  ngAfterViewInit(){
    this.googleInit();
   // this.facebookInit();
  }
  ngOnInit(){
  /*  FB.getLoginStatus(response => {
      this.facebookStatusChangeCallback(response);
    });*/
  }

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
    public toggleForgotPassword(){
      this.forgotPass = !this.forgotPass;
    }
    public forgotPassword(){
      this._user.requestKey(this.forgotPassModal)
        .subscribe(
          data =>{
            if(data.success){
              this.passwordResetMessage = data.msg;
              this.forgotPass = false;
              this.key = true;
              this.newPass = false;
            }
            else{
              this.passwordResetMessage = data.msg;
            }
          },
          err =>{this.serverOffline = true; console.log(err)},()=>{}
        )
    }
    public verifyKey(){
      this._user.checkKey(this.forgotPassModal)
        .subscribe(
          data =>{
            if(data.success){
              this.passwordResetMessage = "Enter New Password";
              this.forgotPass = false;
              this.key = false;
              this.newPass = true;
            }
            else{
              this.passwordResetMessage = data.msg;
            }
          },
          err =>{this.serverOffline = true; console.log(err)},()=>{}
        )
    }
     public changePassword(){
      this._user.resetPassword(this.forgotPassModal)
        .subscribe(
          data =>{
            if(data.success){
              this.passwordResetMessage = "";
              this.forgotPass = false;
              this.key = false;
              this.newPass = false;
              this.passwordResetSuccess = true;
            }
            else{
              this.passwordResetMessage = data.msg;
            }
          },
          err =>{this.serverOffline = true; console.log(err)},()=>{}
        )
    }

    public logout(){
      this.loginSuccess = false;
      this._auth.Logout();
    }

    public ToggleActive(){
        this.active = !this.active;
    }
/*
  public facebookInit(){
    FB.init({
      appId      : '1889101234695879',
      cookie     : false,  // enable cookies to allow the server to access
      // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.5' // use graph api version 2.5
    });
  }

  public onFacebookLoginClick(){
    FB.login((result: any) => {
      this.loged = true;
      this.token = result;
    }, { scope: 'user_friends' });
  }
  facebookStatusChangeCallback(resp) {
    if (resp.status === 'connected') {
      // connect here with your server for facebook login by passing access token given by facebook
      console.log("Authorized");
      console.log(resp)
    }else if (resp.status === 'not_authorized') {
      console.log("Not Authorized")
    }else {
      console.log(resp)
    }
  };*/

  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.googleClientId,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      that.attachGoogleSignin(document.getElementById('googleBtn'));
    });
  }
  public attachGoogleSignin(element) {
    let that = this;
    let newuser = this.googleLogin;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {
        let profile = googleUser.getBasicProfile();
        newuser.token = googleUser.getAuthResponse().id_token;
        newuser.id = profile.getId();
        newuser.name = profile.getName();
        newuser.image_url = profile.getImageUrl();
        newuser.email = profile.getEmail();

       that.addGoogleUser(newuser)
      }, function (error) {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  public addGoogleUser(newuser) {
    let that = this;
    that._user.google(newuser)
      .subscribe(
        data => {
          that.serverOffline = false;
          if(data.success){
            that.incorrect = false;
            var token = data.data;
            that.addToLocalStorage(token);
            that.loginSuccess = true;
          }
          else if(!data.success){
            that.incorrect = true;
            that.loginSuccess = false;
          }
        },
        err => {
          that.serverOffline = true;
        },
        () => {}
      )
  }

public addToLocalStorage(token){
  localStorage.setItem('token', token);
}

public enterPressedSignIn(e,f){
  /*if(f.valid){
    if(e.key == 'Enter'){
      console.log('Yes Ente Pressed');
    }
  }*/
}
}
