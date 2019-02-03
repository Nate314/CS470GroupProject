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
        ['Collectibles',
        'Commands',
        'DiscordUsers',
        'DiscordUserCollectibles',
        'DiscordUserServers',
        'DiscordUserSocialMedias',
        'Embeds',
        'Raffles',
        'Servers',
        'SocialMedias'].forEach(table => {
            this.helloWorldService.dtoSelectExample(table).subscribe(response => {
                this.items.push(<Item>{
                    method: `SELECT * FROM ${table}`,
                    info: JSON.stringify(response)
                });
            });
        });
        const tempTable = 'DiscordUsers';
        const where = 'DiscordUserID = 22';
        // this.helloWorldService.dtoDeleteExample(tempTable, where).subscribe(response => {
        //         this.items.push(<Item>{
        //             method: `DELETING FROM ${tempTable} WHERE ${where} `,
        //             info: JSON.stringify(response)
        //         });
        // });
        // let tempEntity = {
        //     UserName: 'Nate314'
        // };
        // this.helloWorldService.dtoInsertExample(tempTable, tempEntity).subscribe(response => {
        //     this.items.push(<Item>{
        //         method: `INSERTING ${JSON.stringify(tempEntity)} ${tempTable} `,
        //         info: JSON.stringify(response)
        //     });
        // });
        // tempEntity = {
        //     UserName: 'Different'
        // };
        // const where = 'UserName = \'Nate314\'';
        // this.helloWorldService.dtoUpdateExample(tempTable, tempEntity, where).subscribe(response => {
        //     this.items.push(<Item>{
        //         method: `UPDATING ${JSON.stringify(tempEntity)} ON ${tempTable} WHERE ${where}`,
        //         info: JSON.stringify(response)
        //     });
        // });

        // this.helloWorldService.getExample().subscribe(response => {
        //     this.items.push(<Item>{
        //         method: 'GET',
        //         info: JSON.stringify(response)
        //     });
        // }, data => this.error = JSON.stringify(data));
        // this.helloWorldService.getIDExample().subscribe(response => {
        //     this.items.push(<Item>{
        //         method: 'GET ID',
        //         info: JSON.stringify(response)
        //     });
        // }, data => this.error = JSON.stringify(data));
        // this.helloWorldService.postExample().subscribe(response => {
        //     this.items.push(<Item>{
        //         method: 'POST',
        //         info: JSON.stringify(response)
        //     });
        // }, data => this.error = JSON.stringify(data));
        // this.helloWorldService.putExample().subscribe(response => {
        //     this.items.push(<Item>{
        //         method: 'PUT',
        //         info: JSON.stringify(response)
        //     });
        // }, data => this.error = JSON.stringify(data));
        // this.helloWorldService.deleteExample().subscribe(response => {
        //     this.items.push(<Item>{
        //         method: 'DELETE',
        //         info: JSON.stringify(response)
        //     });
        // }, data => this.error = JSON.stringify(data));
    }
}
