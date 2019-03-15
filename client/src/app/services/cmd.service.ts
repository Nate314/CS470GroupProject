import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './_base.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CmdService extends BaseService {

    constructor(private http: HttpClient) {
        super(http);
    }

    transfer(sender: string, receiver: string, amount: number): Observable<any> {
        const body = {
            Sender: sender,
            Receiver: receiver,
            amount: amount
        };
        return this.http.post<any>(`${this.API_URL}/api/currency/transfer`, body, this.getHttpOptions());
    }

    daily(discordUserID: string): Observable<any> {
        return this.transfer('0', discordUserID, 200);
    }
}
