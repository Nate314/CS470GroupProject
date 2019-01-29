import { Component, OnInit } from '@angular/core';
import { Utility } from 'src/app/_helpers/Utility';
import { ComponentNames } from 'src/app/_models/application-models/ComponentNames';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    constructor() {
    }
    ngOnInit() {
    }
    login() {
        Utility.goto(ComponentNames.PAGE_HELLO_WORLD);
    }
}
