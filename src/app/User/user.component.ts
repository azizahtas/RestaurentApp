import { Component } from '@angular/core';
import { Auth } from '../Auth/auth.service';
import { UserService } from './user.service';
import { BranchService } from '../Branch/branch.service';
import { UserSignup, UserSearchModal, OtherDetails , UserViewModal} from './user.modal';
import { Message } from '../Shared/Message.modal';
import { Branch } from '../Branch/branch.modal';
@Component({
    selector: 'user',
    templateUrl: './user.component.html',
})
export class UserComponent {
    constructor(private _auth: Auth, private _user: UserService,
    private _bran:BranchService) { }

    Users: UserViewModal[];
    SearchedUsers: UserViewModal[];
    messages: Message[];
    Branches:Branch[];

    user_search: UserSearchModal;
    userAdd : UserSignup;
    userEdit : UserViewModal;
    userDelete : UserViewModal;

    serverOffline: boolean = false;
    checking_Email: boolean = false;
    checking_Email_Error: boolean = false;
    incorrectSignup: boolean = false;

    userCount: number = 0;
    managerCount: number = 0;
    

    ngOnInit() {
        this.Users = [];
        this.SearchedUsers = [];
        this.messages = [];
        this.Branches = [];

        this.user_search = new UserSearchModal();
        this.userAdd = new UserSignup();
        this.userEdit = new UserViewModal();
        this.userDelete = new UserViewModal();


        this.getAllUsers();
        this.getAllBranches();
    }

    public EditUser(user:UserViewModal){
        this.userEdit = user;
    }

    public DeleteUser(user : UserViewModal){
        this.userDelete = user;
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

    public Manager(Edit: boolean) {
        this.messages = [];
        if (!Edit) {
            var newuser = new UserSignup();
            newuser.local.email = this.userAdd.local.email;
            newuser.local.password = this.userAdd.local.password;
            newuser.otherDetails.fname = this.userAdd.otherDetails.fname;
            newuser.otherDetails.lname = this.userAdd.otherDetails.lname;
            newuser.otherDetails.phone = this.userAdd.otherDetails.phone;
            newuser.otherDetails._branchId = this.userAdd.otherDetails._branchId;
            newuser.otherDetails.bm = true;
            console.log("New User :");
            console.log(newuser);
            console.log("Manager :");
            console.log(this.userAdd);
            this._user.signup(newuser)
                .subscribe(
                data => {
                    this.serverOffline = false;
                    if (data.success) {
                        this.messages.push({ type: 'success', title: 'Registered Successfully!!', message: 'Welcome ' + newuser.otherDetails.fname + ' ' + newuser.otherDetails.lname });
                        this.incorrectSignup = false;
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
                () => { this.getAllUsers(); }
                )
        }
        else{
            var newUserEdit = new OtherDetails();
            newUserEdit.fname = this.userEdit.fname;
            newUserEdit.lname = this.userEdit.lname;
            newUserEdit.phone = this.userEdit.phone;
            newUserEdit._branchId = this.userEdit._branchId;
            newUserEdit.bm = this.userEdit.bm;
            this._user.editUser(this.userEdit._Id, newUserEdit)
            .subscribe(
                data =>{
                    this.serverOffline = false;
                    if(data.success){
                        this.messages.push({ type: 'success', title:'User '+this.userEdit.fname+' '+this.userEdit.lname+' Saved Successfully!!', message: '' });
                    }
                    else{
                   this.messages.push({ type: 'danger', title:'something Went Wrong! Please Try Again!', message: data.msg});
                    }
                },
                err=>{this.serverOffline = true;
            this.messages.push({ type: 'danger', title:'Server is Offline!', message:''});    
            },
                ()=> {}
            )
        }
    }

    public Delete(){
        this._user.deleteUser(this.userDelete._Id)
        .subscribe(
            data => {
                 this.serverOffline = false;
                if(data.success){
                   this.messages.push({ type: 'success', title:'User '+this.userDelete.fname+' '+this.userDelete.lname+' Deleted Successfully!!', message: '' });
                   this.getAllUsers();
                }
                else{
                   this.messages.push({ type: 'danger', title:'something Went Wrong! Please Try Again!', message: data.msg});
                }
            },
            err =>{
                this.serverOffline = true;
                this.messages.push({ type: 'danger', title:'Server is Offline!', message:''});
            },
            () =>{}
        );
    }

    public updateUserCount(){
        this.userCount =0;
        this.managerCount =0;
        for(var i = 0; i<this.SearchedUsers.length; i++){
            if(this.SearchedUsers[i].bm) this.managerCount++;
            if(!this.SearchedUsers[i].bm) this.userCount++;
        }
    }

    public clear(){
        this.user_search.FName = "";
        this.user_search.LName = "";
    }

    public showAll(){
        this.SearchedUsers = this.Users;
        this.updateUserCount();
    }

    public Search(FName:boolean){
        this.SearchedUsers=[];
        if(FName){
            let patf = new RegExp(this.user_search.FName, 'i');
            for(var i=0;i<this.Users.length;i++){
                if(patf.test(this.Users[i].fname)){
                    console.log('FName:'+this.Users[i].fname);
                    this.SearchedUsers.push(this.Users[i]);
                }
            }
        }
        else{
            let patl = new RegExp(this.user_search.LName, 'i');
            for(var i=0;i<this.Users.length;i++){
                if(patl.test(this.Users[i].lname)){
                    console.log('LName:'+this.user_search.LName);
                    this.SearchedUsers.push(this.Users[i]);
                }
            }
        }
        this.updateUserCount();
    }

    public getBranchName(Id:string):string{
        var Name = "";
        for(var i=0; i<this.Branches.length; i++){
            if( this.Branches[i]._id == Id) Name = this.Branches[i].Name;
        }
        return Name;
    }

    private getAllUsers() {
        this._user.getAllUsers()
            .subscribe(
            data => {
                this.serverOffline = false;
                if (data.success) {
                    this.Users = [];
                    for(var i = 0; i<data.data.Users.length; i++){
                        var newUser = new UserViewModal();
                        newUser._Id = data.data.Ids[i];
                        newUser._branchId = data.data.Users[i]._branchId;
                        newUser.bm = data.data.Users[i].bm;
                        newUser.who = data.data.Users[i].who;
                        newUser.fname = data.data.Users[i].fname;
                        newUser.lname = data.data.Users[i].lname;
                        newUser.phone = data.data.Users[i].phone;
                        this.Users.push(newUser);    
                    }
                    this.SearchedUsers = this.Users;
                }
                else {
                    this.messages.push({ type: 'danger', title: 'Something Went Wrong! Try Again', message: data.msg});
                }
            },
            err => { this.serverOffline = true; },
            () => { this.updateUserCount(); }
            )
    }

    private getAllBranches() {
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
}
