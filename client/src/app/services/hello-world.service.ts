import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class HelloWorldService extends BaseService {

    constructor(private http: HttpClient) {
        super(http);
    }

    getExample(): Observable<any> {
        return this.http.get<any>(this.API_URL + 'helloworld', this.getHttpOptions());
    }

    getIDExample(): Observable<any> {
        return this.http.get<any>(this.API_URL + 'helloworld/5', this.getHttpOptions());
    }

    postExample(): Observable<any> {
        const body = { Var1: 'example json for post' };
        return this.http.post<any>(this.API_URL + 'helloworld', body, this.getHttpOptions());
    }

    putExample(): Observable<any> {
        const body = { Var1: 'example json for put' };
        return this.http.put<any>(this.API_URL + 'helloworld', body, this.getHttpOptions());
    }

    deleteExample(): Observable<any> {
        return this.http.delete<any>(this.API_URL + 'helloworld/3', this.getHttpOptions());
    }
}
