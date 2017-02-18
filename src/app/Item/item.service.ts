
import {Injectable} from "@angular/core";
import {Settings} from "../settings";
import "../rxjs.operators";
import {Http} from "@angular/http";
import {MenuItem} from "./Item.modal";
import {GeneralResponseModal} from "../Shared/GeneralResponseModal";
import {Observable} from "rxjs/Observable";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class ItemService{
    constructor(private _http:Http,private _authHttp :AuthHttp){}
    private _baseUrl = "http://"+Settings.serverHost+":"+Settings.serverPort+"/api/menu";

    getAllItems(query?) : Observable<GeneralResponseModal>
    {
        if(query){
            return this._http.get(this._baseUrl+"/u/Search/"+query)
                .map(d => d.json())
        }else {
            return this._http.get(this._baseUrl)
                .map(d => d.json())
        }
    }

    addItem(item : MenuItem): Observable<GeneralResponseModal> {
        return this._authHttp.post(this._baseUrl,item)
            .map(res => res.json())
    }

    editItem(item : MenuItem): Observable<GeneralResponseModal> {
        return this._authHttp.put(this._baseUrl+'/'+item._id,item)
            .map(res => res.json())
    }

    deleteItem(Id : string): Observable<GeneralResponseModal> {
        return this._authHttp.delete(this._baseUrl+'/'+Id)
            .map(res => res.json())
    }



    checkName(name : string): Observable<GeneralResponseModal> {
        return this._http.get(this._baseUrl+'/check/'+name)
            .map(res => res.json())
            .debounceTime(500)
            .distinctUntilChanged()
    }

}