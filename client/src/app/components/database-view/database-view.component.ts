import { Component, OnInit } from '@angular/core';
import { HelloWorldService } from 'src/app/services/hello-world.service';
import { Table } from 'src/app/_angular/components/mat-table/mat-table.component';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-database-view',
    templateUrl: './database-view.component.html'
})
export class DatabaseViewComponent implements OnInit {

    error: string[] = [];
    tables: Table[] = [];

    constructor(private helloWorldService: HelloWorldService) {
    }

    ngOnInit() {
        ['collectibles',
        'commands',
        'currencytransactions',
        'discordusercollectibles',
        'discorduserraffles',
        'discordusers',
        'discorduserservers',
        'discordusersocialmedias',
        'rafflehistory',
        'raffles',
        'resources',
        'servers',
        'socialmedias'].forEach(table => {
            this.helloWorldService.dtoSelectExample(table).subscribe(response => {
                if (response.length > 0) {
                    this.tables.push(<Table> {
                        data: new MatTableDataSource(response),
                        props: Object.keys(response[0]),
                        titles: Object.keys(response[0])
                    });
                } else {
                    this.error.push(`There are no rows in the ${table} table.`);
                }
            });
        });
    }
}
