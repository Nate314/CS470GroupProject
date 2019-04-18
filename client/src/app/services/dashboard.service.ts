import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './_base.service';
import { Observable } from 'rxjs';
import { User } from '../_models/dtos/User';

@Injectable({
    providedIn: 'root'
})
export class DashboardService extends BaseService {

    constructor(private http: HttpClient) {
        super(http);
    }

    getUserData(userID: string): Observable<User> {
        return this.http.get<User>(`${this.API_URL}/api/getuserinfo/${userID}`);
    }
}
