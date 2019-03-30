import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { User } from 'src/app/_models/dtos/User';
import { Utility } from 'src/app/_helpers/Utility';
import * as moment from 'moment';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    user: User;
    userJSON: string;

    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit() {
        this.dashboardService.getUserData(Utility.getDiscordUserID()).subscribe(user => {
            this.user = user;
            this.user.LastDaily = moment(this.user.LastDaily).format("LLL").toString();
            this.userJSON = JSON.stringify(user);
        });
    }
}
