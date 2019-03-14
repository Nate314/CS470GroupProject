import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { User } from 'src/app/_models/dtos/User';
import * as decode from 'jwt-decode';
import { userinfoService } from 'src/app/services/userinfo.service';
import { MatTableDataSource } from '@angular/material';
import { Table } from 'src/app/_angular/components/mat-table/mat-table.component';

@Component({
    selector: 'app-userinfo',
    templateUrl: './userinfo.component.html',
    styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

    users: User[];
    usersJSON: string;
    table: Table;
    

    constructor(private userinfoService: userinfoService) {
    }

    ngOnInit() {
        this.userinfoService.getAllUsers().subscribe(users => {
            this.userinfoService.getAllResources().subscribe(profilepics => {
                    for( let user of users){
                        let rid = user.ResourceID;
                        let link = "";
                        for(let profilepic of profilepics)
                            if(user.ResourceID === profilepic.ResourceID)
                                user.ProfilePictureURL = profilepic.Link;
                    }
                    users.forEach(user => user.UserName = user.ProfilePictureURL + ','  + user.UserName);
                this.table = <Table> {
                    data: new MatTableDataSource(users),
                    props: ['UserName', 'DiscordUserID','UserHash','Currency','LastDaily',],
                    titles: ['User Name','Discord User ID','User Hash','Currency','Last Daily',]
                };
            });
        });
    }
}