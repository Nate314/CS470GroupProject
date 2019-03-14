import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './_base.service';
import { Observable } from 'rxjs';
import { User } from '../_models/dtos/User';

@Injectable({
    providedIn: 'root'
})
export class CmdService extends BaseService {

    constructor(private http: HttpClient) {
        super(http);
    }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.API_URL}/api/dto/discordusers`);
    }
}
