import { Component, OnInit, Output } from '@angular/core';
import { HelloWorldService } from 'src/app/services/hello-world.service';
import { TestingCompilerFactory } from '@angular/core/testing/src/test_compiler';

class Item {
    method: string;
    info: string;
}

@Component({
    selector: 'app-hello-world',
    templateUrl: './hello-world.component.html'
})
export class HelloWorldComponent implements OnInit {

    error: string;
    items: Item[] = [];

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
                this.items.push(<Item>{
                    method: `SELECT * FROM ${table}`,
                    info: JSON.stringify(response)
                });
            });
        });
    }
}
