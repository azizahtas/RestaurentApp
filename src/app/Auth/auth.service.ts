import {Injectable} from "@angular/core";
import {tokenNotExpired, JwtHelper} from "angular2-jwt";

@Injectable()
export class Auth{
    jwtHelper: JwtHelper = new JwtHelper();
    loggedIn() {
        if(localStorage.getItem('token') != null){
            var decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
            if(decodedToken.who && decodedToken._id!=null || decodedToken._id!=""){
                return true;
            }
        }
        else{
            return false;
        }
    }
    isAdmin(){
        if(this.loggedIn()){
            var decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
            return decodedToken.who;
        }
        else return false;
    }
    isManager(){
        if(this.loggedIn()){
            var decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
            return decodedToken.bm;
        }
        else return false;
    }
    public Logout(){
        localStorage.removeItem('token');
    }

    public getId():string{
        if(this.loggedIn()){
            var decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
            return decodedToken._id;
        }
        else{
            return null;
        }
    }
    public getBranchId():string{
        if(this.loggedIn()){
            var decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
            return decodedToken._branchId;
        }
        else{
            return null;
        }
    }
}