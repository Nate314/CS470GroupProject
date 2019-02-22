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
        ['Aliases',
        'Categories',
        'Collectibles',
        'Commands',
        'Descriptions',
        'DiscordUsers',
        'DiscordUserCollectibles',
        'DiscordUserServers',
        'DiscordUserSocialMedias',
        'Raffles',
        'Resources',
        'Servers',
        'ServerCategories',
        'SocialMedias'].forEach(table => {
            this.helloWorldService.dtoSelectExample(table).subscribe(response => {
                this.items.push(<Item>{
                    method: `SELECT * FROM ${table}`,
                    info: JSON.stringify(response)
                });
            });
        });
    }
}
