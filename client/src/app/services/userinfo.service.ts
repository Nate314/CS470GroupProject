import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './_base.service';
import { Observable } from 'rxjs';
import { User } from '../_models/dtos/User';
import { Resource } from '../_models/dtos/resource';

@Injectable({
    providedIn: 'root'
})
export class userinfoService extends BaseService {

    constructor(private http: HttpClient) {
        super(http);
    }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.API_URL}/api/dto/discordusers`);
    }

    getAllResources(): Observable<Resource[]> {
        return this.http.get<Resource[]>(`${this.API_URL}/api/dto/resources`);
    }
}

// Get all users = GET {apiurl}/api/dto/discordusers
// Get all resources = GET {apiurl}/api/dto/resources