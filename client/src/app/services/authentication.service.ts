import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './_base.service';
import { Constants } from '../_helpers/Constants';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService extends BaseService {

    constructor(private http: HttpClient) {
        super(http);
    }

    login(token: string, username: string, password: string): Observable<any> {
        const body = {
            token: token,
            username: username,
            password: password
        };
        return this.http.post(`${this.API_URL}/auth/login`, body, this.getHttpOptions());
    }
}
