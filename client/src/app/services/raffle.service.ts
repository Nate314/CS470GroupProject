import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './_base.service';
import { Observable } from 'rxjs';
import { User } from '../_models/dtos/User';
import { Utility } from '../_helpers/Utility';
import { Raffle } from '../_models/dtos/Raffle';
import { RaffleInfo } from '../_models/dtos/RaffleInfo';


@Injectable({
    providedIn: 'root'
})
export class RaffleInfoService extends BaseService {

    constructor(private http: HttpClient) {
        super(http);
    }
    //return user current or past involvement 
    getUserRaffleData(): Observable<Raffle[]> {
        return this.http.get<Raffle[]>(`${this.API_URL}/api/raffles/discorduser.${Utility.getDiscordUserID()}`);
    }
    getServerRaffles(ServerID): Observable<RaffleInfo[]> {
        return this.http.get<RaffleInfo[]>(`${this.API_URL}/api/raffles/server.${ServerID}`);
    }//currently going on depending on server id passed
    getDiscorduserServers(): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/api/dto/discorduserservers`, this.getHttpOptions());
    }
}

//CONSOLE LOG A RESPONSE -
// http://10.0.0.13:5000/api/raffles/discorduser.172002275412279296
// returns a list of raffles that the discorduser has or is participating in

// http://10.0.0.13:5000/api/raffles/server.540715907312254976
// returns a list of current raffles for that server