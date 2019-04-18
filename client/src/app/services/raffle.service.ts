import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './_base.service';
import { Observable } from 'rxjs';
import { User } from '../_models/dtos/User';
import { Utility } from '../_helpers/Utility';


@Injectable({
    providedIn: 'root'
})
export class RaffleInfoService extends BaseService {

    constructor(private http: HttpClient) {
        super(http);
    }
    //return user current or past involvement 
    getUserData(): Observable<any[]> {
        return this.http.get<any[]>(`${this.API_URL}/api/raffles/discorduser.${Utility.getDiscordUserID()}`);
    }
    getServerID(ServerID): Observable<any[]> {
        return this.http.get<any[]>(`${this.API_URL}/api/raffles/server.${ServerID}`);
    }//currently going on depending on server id passed
}

//CONSOLE LOG A RESPONSE -
// http://10.0.0.13:5000/api/raffles/discorduser.172002275412279296
// returns a list of raffles that the discorduser has or is participating in

// http://10.0.0.13:5000/api/raffles/server.540715907312254976
// returns a list of current raffles for that server