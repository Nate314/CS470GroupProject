import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './_base.service';

@Injectable({
    providedIn: 'root'
})
export class HelloWorldService extends BaseService {

    constructor(private http: HttpClient) {
        super(http);
    }

    getExample(): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/helloworld`, this.getHttpOptions());
    }

    getIDExample(): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/helloworld/5`, this.getHttpOptions());
    }

    postExample(): Observable<any> {
        const body = { Var1: 'example json for post' };
        return this.http.post<any>(`${this.API_URL}/helloworld`, body, this.getHttpOptions());
    }

    putExample(): Observable<any> {
        const body = { Var1: 'example json for put' };
        return this.http.put<any>(`${this.API_URL}/helloworld`, body, this.getHttpOptions());
    }

    deleteExample(): Observable<any> {
        return this.http.delete<any>(`${this.API_URL}/helloworld/3`, this.getHttpOptions());
    }

    // /api/todo
    dtoSelectExample(table: string): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/api/dto/${table}`, this.getHttpOptions());
    }
    dtoInsertExample(table: string, entity: any): Observable<any> {
        const body = {
            'table': table,
            'entity': entity
        };
        return this.http.post<any>(`${this.API_URL}/api/dto`, body, this.getHttpOptions());
    }
    dtoUpdateExample(table: string, entity: any, where: string): Observable<any> {
        const body = {
            'table': table,
            'entity': entity,
            'where': where
        };
        return this.http.put<any>(`${this.API_URL}/api/dto`, body, this.getHttpOptions());
    }
    dtoDeleteExample(table: string, where: string): Observable<any> {
        const body = {
            'table': table,
            'where': where
        };
        return this.http.post<any>(`${this.API_URL}/api/dto/${table}`, body, this.getHttpOptions());
    }
}
