import { Component, OnInit, Output } from '@angular/core';
import { HelloWorldService } from 'src/app/services/hello-world.service';

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
        this.helloWorldService.getExample().subscribe(response => {
            this.items.push(<Item>{
                method: 'GET',
                info: JSON.stringify(response)
            });
        }, data => this.error = JSON.stringify(data));
        this.helloWorldService.getIDExample().subscribe(response => {
            this.items.push(<Item>{
                method: 'GET ID',
                info: JSON.stringify(response)
            });
        }, data => this.error = JSON.stringify(data));
        this.helloWorldService.postExample().subscribe(response => {
            this.items.push(<Item>{
                method: 'POST',
                info: JSON.stringify(response)
            });
        }, data => this.error = JSON.stringify(data));
        this.helloWorldService.putExample().subscribe(response => {
            this.items.push(<Item>{
                method: 'PUT',
                info: JSON.stringify(response)
            });
        }, data => this.error = JSON.stringify(data));
        this.helloWorldService.deleteExample().subscribe(response => {
            this.items.push(<Item>{
                method: 'DELETE',
                info: JSON.stringify(response)
            });
        }, data => this.error = JSON.stringify(data));
    }
}
