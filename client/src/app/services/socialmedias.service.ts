import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './_base.service';
import { Observable } from 'rxjs';
import { User } from '../_models/dtos/User';
import { Resource } from '../_models/dtos/resource';
import { SocialMedias } from '../_models/dtos/Socialmedias';
import { Utility } from '../_helpers/Utility';


@Injectable({
    providedIn: 'root'
})
export class SocialMediasService extends BaseService {

    constructor(private http: HttpClient) {
        super(http);
    }

    getSocialMedias(DiscordUserID): Observable<SocialMedias[]> {
        return this.http.get<SocialMedias[]>(`${this.API_URL}/api/social/${DiscordUserID}`);
    }
}