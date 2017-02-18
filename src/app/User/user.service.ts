import {Injectable} from "@angular/core";
import "../rxjs.operators";
import {Http} from "@angular/http";
import {Settings} from "../settings";
import {UserLogin, UserSignup, OtherDetails} from "./user.modal";
import {Observable} from "rxjs/Observable";
import {GeneralResponseModal} from "../Shared/GeneralResponseModal";
import {AuthHttp} from "angular2-jwt";
@Injectable()
export class UserService {
    constructor(private _http:Http,private _authHttp: AuthHttp) {
    }
    private _baseUrl = "http://" + Settings.serverHost + ":" + Settings.serverPort + "/api/user";

    login(user : UserLogin): Observable<GeneralResponseModal> {
        return this._http.post(this._baseUrl+"/login",user)
            .map(res => res.json())
    }

    signup(user : UserSignup): Observable<GeneralResponseModal>{
        return this._http.post(this._baseUrl+"/signup",user)
            .map(res => res.json())
    }

    checkUser(email : String): Observable<GeneralResponseModal>{
        return this._http.get(this._baseUrl+"/checkUser/"+email)
            .map(res => res.json())
    }

    getAllUsers(querry?): Observable<GeneralResponseModal> {
        return this._authHttp.get(this._baseUrl + "/")
            .map(res => res.json())
    }

    deleteUser(userId : string): Observable<GeneralResponseModal> {
        return this._authHttp.delete(this._baseUrl + "/"+userId)
            .map(res => res.json())
    }

    editUser(userId : string,newUser : OtherDetails): Observable<GeneralResponseModal> {
         return this._authHttp.put(this._baseUrl + "/"+userId, newUser)
            .map(res => res.json())
    }


}
