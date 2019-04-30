import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { User } from 'src/app/_models/dtos/User';
import * as decode from 'jwt-decode';
import { userinfoService } from 'src/app/services/userinfo.service';
import { MatTableDataSource } from '@angular/material';
import { Table } from 'src/app/_angular/components/mat-table/mat-table.component';
import { RaffleInfoService } from 'src/app/services/raffle.service';
import { Utility } from 'src/app/_helpers/Utility';
import * as moment from 'moment';
import { SocialMediasService } from 'src/app/services/socialmedias.service';
import { SocialMedias } from 'src/app/_models/dtos/Socialmedias';



@Component({
    selector: 'app-socialmedias',
    templateUrl: './socialmedias.component.html',
    styleUrls: ['./socialmedias.component.css']
})
export class SocialmediasComponent implements OnInit {
    public userData: {user: User; socialMedialList: SocialMedias[]}[] = [];
    DiscordUserID: number;
    SocialMediaName: string;
    socialMediaList: any = [];

    constructor(private socialMediasService: SocialMediasService, private userinfoService: userinfoService) {
    }

    ngOnInit() {
         this.SocialData(this.DiscordUserID);
         this.userinfoService.getAllUsers().subscribe(users => {
             users.forEach(user => {
                this.socialMediasService.getSocialMedias(user.DiscordUserID).subscribe(list => {
                    this.userData.push({
                        user: user,
                        socialMedialList: list
                    });
                });
             });

             console.log(this);

            this.userinfoService.getAllResources().subscribe(profilepics => {
                    for( let user of users){
                        let rid = user.ResourceID;
                        let link = "";
                        for(let profilepic of profilepics)
                            if(user.ResourceID === profilepic.ResourceID)
                                user.ProfilePictureURL = profilepic.Link; 
                    }
            });
        });
    }
    SocialData(DiscordUserID) {
        this.socialMediasService.getSocialMedias(DiscordUserID).subscribe(SocialMedias => {
            this.socialMediaList = SocialMedias;
            console.log(this.socialMediaList);
        })
    }
}

