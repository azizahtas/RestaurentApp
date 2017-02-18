
import {Injectable} from "@angular/core";
import {Settings} from "../settings";
import "../rxjs.operators";
import {Http} from "@angular/http";
import {TimeSlot} from "./timeslot.modal";
import {Observable} from "rxjs/Observable";
import {GeneralResponseModal} from "../Shared/GeneralResponseModal";

@Injectable()
export class TimeSlotService{
    constructor(private _http:Http){}
    private _baseUrl = "http://"+Settings.serverHost+":"+Settings.serverPort+"/api/TimeSlot";

    getAllTimeSlots(query?) : Observable<GeneralResponseModal>
    {
            return this._http.get(this._baseUrl)
                .map(d => d.json())
    }
}