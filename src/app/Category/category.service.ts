
import {Injectable} from "@angular/core";
import {Settings} from "../settings";
import "../rxjs.operators";
import {Http} from "@angular/http";
import {Category} from "./category.modal";
import {Observable} from "rxjs/Observable";
import {GeneralResponseModal} from "../Shared/GeneralResponseModal";

@Injectable()
export class CategoryService{
    constructor(private _http:Http){}
    private _baseUrl = "http://"+Settings.serverHost+":"+Settings.serverPort+"/api/Category";

    getAllCategories(query?) : Observable<GeneralResponseModal>
    {
        if(query){
            return this._http.get(this._baseUrl+"/u/Search/"+query)
                .map(d => d.json())
        }else {
            return this._http.get(this._baseUrl)
                .map(d => d.json())
        }
    }
}