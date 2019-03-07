import { Component, OnInit } from '@angular/core';
import { HelloWorldService } from 'src/app/services/hello-world.service';
import { Table } from 'src/app/_angular/components/mat-table/mat-table.component';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-hello-world',
    templateUrl: './hello-world.component.html'
})
export class HelloWorldComponent implements OnInit {

    error: string[] = [];
    tables: Table[] = [];

    constructor(private helloWorldService: HelloWorldService) {
    }

    ngOnInit() {
        ['aliases',
        'categories',
        'collectibles',
        'commands',
        'descriptions',
        'discordusers',
        'discordusercollectibles',
        'discorduserservers',
        'discordusersocialmedias',
        'raffles',
        'resources',
        'servers',
        'servercategories',
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
