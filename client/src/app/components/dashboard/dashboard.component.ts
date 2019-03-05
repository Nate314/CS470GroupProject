import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { User } from 'src/app/_models/dtos/User';
import * as decode from 'jwt-decode';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
}) 
export class DashboardComponent implements OnInit {

    user: User;
    userJSON: string;

    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit() {
        const discordUserID = decode(localStorage.getItem('AuthenticationToken'))['DiscordUserID'];
        this.dashboardService.getUserData(discordUserID).subscribe(user => {
            this.user = user;
            this.userJSON = JSON.stringify(user);
        });
    }
}
