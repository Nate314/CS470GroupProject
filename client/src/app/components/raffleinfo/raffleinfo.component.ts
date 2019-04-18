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
    completedTable: Table;
    ongoingTable: Table;
    serverTables: Table[];
    serverIDList: string[];

    constructor(private raffleInfoService: RaffleInfoService, private dashboardService: DashboardService) {
    }

    ngOnInit() {
        this.raffleInfoService.getUserRaffleData().subscribe(Raffle => {
            const completedRaffles = [];
            const ongoingRaffles = [];
            console.log(Raffle);
            Raffle.forEach(raffle => {
                this.dashboardService.getUserData(raffle.DiscordUserID).subscribe(user => {
                    // raffle.DiscordUserID = user.UserName;
                    raffle.DiscordUserID = user.ProfilePictureURL + ','  + user.UserName;
                });
                this.dashboardService.getUserData(raffle.WinnerDiscordUserID).subscribe(user => {
                    raffle.WinnerDiscordUserID = user.UserName;
                    raffle.WinnerDiscordUserID = user.ProfilePictureURL + ','  + user.UserName;
                });
                if (raffle.WinnerDiscordUserID === 'None') {
                    ongoingRaffles.push(raffle);
                } else {
                    completedRaffles.push(raffle);
                }
            });
            this.completedTable = <Table> {
                data: new MatTableDataSource(completedRaffles),
                props: ['DiscordUserID','ServerID','Name','WinnerDiscordUserID','EndTime'],
                titles: ['Discord User iD','Server Name','Raffle Name','Raffle Winner','Ended']
            };
            this.ongoingTable = <Table> {
                data: new MatTableDataSource(ongoingRaffles),
                props: ['DiscordUserID','ServerID','Name','EndTime'],
                titles: ['Discord User iD','Server Name','Raffle Name','Ended']
            };
        });
        this.raffleInfoService.getDiscorduserServers().subscribe(userserverpairs => {
            this.serverIDList = [];
            userserverpairs.forEach(pair => {
                if (pair['DiscordUserID'] === Utility.getDiscordUserID()) {
                    this.serverIDList.push(pair['ServerID']);
                }
            });
            this.serverTables = [];
            this.serverIDList.forEach(serverID => {
                this.raffleInfoService.getServerRaffles(serverID).subscribe(raffles => {
                    const serverTableRaffles = [];
                    raffles.forEach(raffle => {
                        this.dashboardService.getUserData(raffle.Raffle.DiscordUserID).subscribe(user => {
                            raffle.Raffle.DiscordUserID = user.ProfilePictureURL + ','  + user.UserName;
                        });
                        serverTableRaffles.push(raffle.Raffle);
                    });
                    console.log(raffles);
                    this.serverTables.push(<Table> {
                        data: new MatTableDataSource(serverTableRaffles),
                        props: ['DiscordUserID','Name','Currency','EndTime'],
                        titles: ['Discord User ID','Server Name','Curerency','End Time']
                    });
                });
            });
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