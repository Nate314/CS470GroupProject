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

@Component({
    selector: 'app-raffleinfo',
    templateUrl: './raffleinfo.component.html',
    styleUrls: ['./raffleinfo.component.css']
})
export class RaffleInfoComponent implements OnInit {

    users: User[];
    usersJSON: string;
    table: Table;
    

    constructor(private raffleInfoService: RaffleInfoService, private dashboardService: DashboardService) {
    }

    ngOnInit() {
        this.raffleInfoService.getUserData().subscribe(Raffle => {
            console.log(Raffle)
            Raffle.forEach(raffle =>{
                this.dashboardService.getUserData(raffle.DiscordUserID).subscribe(user => {
                // raffle.DiscordUserID = user.UserName;
                raffle.DiscordUserID = user.ProfilePictureURL + ','  + user.UserName;
            });})
            Raffle.forEach(raffle =>{
                this.dashboardService.getUserData(raffle.WinnerDiscordUserID).subscribe(user => {
                    raffle.WinnerDiscordUserID = user.UserName;
                    raffle.WinnerDiscordUserID = user.ProfilePictureURL + ','  + user.UserName;
            });})
                this.table = <Table> {
                    data: new MatTableDataSource(Raffle),
                    props: ['DiscordUserID','ServerID','Name','WinnerDiscordUserID','EndTime'],
                    titles: ['Discord User iD','Server Name','Raffle Name','Raffle Winner','Ended']
                };
        });
        this.raffleInfoService.getServerID('540715907312254976').subscribe(ServerID => {
            ServerID.forEach(Raffle => {
                console.log(Raffle)
            })
                this.raffleInfoService.getUserData()
        });
        
    }
}
//api call to raffle ongoing in the server***
//seperate unfinished raffles***
//One with winnerID and one without

//TAB - Show current ongoing Raffles
//TAB - Show Unfinished Raffles
//TAB - Show current Raffles on a Server that the User is on.

// Currency: "None"
// DiscordUserID: "309176098590294026" // service to display name in dashboard
// EndTime: "None"
// Name: "None"
// RaffleID: "2"
// ServerID: "None"
// WinnerDiscordUserID: "None"