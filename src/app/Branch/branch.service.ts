
import {Injectable} from "@angular/core";
import {Settings} from "../settings";
import "../rxjs.operators";
import {Http} from "@angular/http";
import {Branch, TableModal} from "./branch.modal";
import {Booking} from "../Booking/booking.modal";
import {GeneralResponseModal} from "../Shared/GeneralResponseModal";
import {Observable} from "rxjs/Observable";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class BranchService{
    constructor(private _http:Http,private _authHttp :AuthHttp){}
    private _baseUrl = "http://"+Settings.serverHost+":"+Settings.serverPort+"/api/branch";

    getAllBranches(query?) : Observable<GeneralResponseModal>
    {
        if(query){
            return this._http.get(this._baseUrl+"/u/Search/"+query)
                .map(d => d.json())
        }else {
            return this._http.get(this._baseUrl)
                .map(d => d.json())
        }
    }

    addBranch(item : Branch): Observable<GeneralResponseModal> {
        return this._authHttp.post(this._baseUrl,item)
            .map(res => res.json())
    }

    editBranch(branch : Branch): Observable<GeneralResponseModal> {
        return this._authHttp.put(this._baseUrl+'/'+branch._id,branch)
            .map(res => res.json())
    }

    deleteBranch(Id : string): Observable<GeneralResponseModal> {
        return this._authHttp.delete(this._baseUrl+'/'+Id)
            .map(res => res.json())
    }
    checkName(name : string): Observable<GeneralResponseModal> {
        return this._http.get(this._baseUrl+'/check/'+name)
            .map(res => res.json())
            .debounceTime(500)
            .distinctUntilChanged()
    }
    addTable(branch_Id:string,table : TableModal): Observable<GeneralResponseModal> {
        return this._authHttp.post(this._baseUrl+'/u/Table/'+branch_Id,table)
            .map(res => res.json())
    }
    editTable(branch_Id:string,table : TableModal): Observable<GeneralResponseModal> {
        return this._authHttp.put(this._baseUrl+'/u/Table/'+branch_Id,table)
            .map(res => res.json())
    }
    deleteTable(branch_Id:string,table_Id : string): Observable<GeneralResponseModal> {
        return this._authHttp.delete(this._baseUrl+'/u/Table/'+branch_Id+'/'+table_Id)
            .map(res => res.json())
    }
}