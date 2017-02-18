
import { Injectable } from "@angular/core";
import { Settings } from "../settings";
import "../rxjs.operators";
import { Http } from "@angular/http";
import { Booking } from "../Booking/booking.modal";
import { GeneralResponseModal } from "../Shared/GeneralResponseModal";
import { Observable } from "rxjs/Observable";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class BookingService {
    constructor(private _http: Http, private _authHttp: AuthHttp) { }
    private _baseUrl = "http://" + Settings.serverHost + ":" + Settings.serverPort + "/api/booking";

    getAllBookings(): Observable<GeneralResponseModal> {
        return this._authHttp.get(this._baseUrl)
            .map(res => res.json())
    }

    getBookings(Canceled: boolean): Observable<GeneralResponseModal> {
        if (Canceled) {
            return this._authHttp.get(this._baseUrl+'/u/Canceled')
                .map(res => res.json())
        }
        else {
            return this._authHttp.get(this._baseUrl+'/u/NotCanceled')
                .map(res => res.json())
        }
    }

    getBookingsByUserId(Id: string): Observable<GeneralResponseModal> {
        if (Id) {
            return this._authHttp.get(this._baseUrl+'/u/UserId/'+Id)
                .map(res => res.json())
        }
    }

    getBookingsByBranchId(Id: string): Observable<GeneralResponseModal> {
        if (Id) {
            return this._authHttp.get(this._baseUrl+'/u/BranchId/'+Id)
                .map(res => res.json())
        }
    }

    getBookingsByTableId(Id: string): Observable<GeneralResponseModal> {
        if (Id) {
            return this._authHttp.get(this._baseUrl+'/u/TableId/'+Id)
                .map(res => res.json())
        }
    }

    getBookingsByDate(date: string): Observable<GeneralResponseModal> {
        if (date) {
            return this._authHttp.get(this._baseUrl+'/u/Date/'+date)
                .map(res => res.json())
        }
    }

    addBooking(booking: Booking): Observable<GeneralResponseModal> {
        return this._authHttp.post(this._baseUrl, booking)
            .map(res => res.json())
    }

}
