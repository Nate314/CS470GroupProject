import { OnInit, Component } from '@angular/core';
import * as moment from 'moment';

class Profile {
    UserName: string;
    UserHash: string;
    Currency: string;
    LastDaily: string;
    ProfilePictureURL: string;
    Collectibles: Map<string, string>[];
    SocialMedias: Map<string, string>[];
}

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    user: Profile;

    constructor() {
    }

    ngOnInit(): void {
        console.log(window.location.href);
        const params = this.getParams(window.location.href);
        console.log(JSON.stringify(params));
        // collectibles
        if (params['Collectibles'] && params['Collectibles'] !== 'None') {
            const collectibles = new Map<string, string>();
            params['Collectibles'].split('!!!!!!!!!!').forEach(collectible => {
                const kv = collectible.split('!!!!!');
                collectibles.set(kv[0], kv[1]);
            });
            params['Collectibles'] = collectibles;
        }
        // social medias
        if (params['SocialMedias'] && params['SocialMedias'] !== 'None') {
            const socialmedias = new Map<string, string>();
            params['SocialMedias'].split('!!!!!!!!!!').forEach(socialmedia => {
                const kv = socialmedia.split('!!!!!');
                socialmedias.set(kv[0], kv[1]);
            });
            params['SocialMedias'] = socialmedias;
        }
        // load into user object
        console.log(params);
        this.user = <Profile> params;
        this.user.LastDaily = moment(this.user.LastDaily).format('LLL').toString();
    }

    getParams(url) {
        const params = {};
        const parser = document.createElement('a');
        parser.href = url;
        const query = parser.search.substring(1);
        const vars = query.split('&');
        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    }

}
