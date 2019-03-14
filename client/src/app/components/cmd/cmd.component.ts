import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { User } from 'src/app/_models/dtos/User';
import * as decode from 'jwt-decode';
import { CmdService } from 'src/app/services/cmd.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
    selector: 'app-cmd',
    templateUrl: './cmd.component.html'
})
export class CmdComponent implements OnInit {

    form: FormGroup;
    loading = true;

    states = [
        {
          name: 'Arkansas',
          population: '2.978M',
          // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
          flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
        },
        {
          name: 'California',
          population: '39.14M',
          // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
          flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
        },
        {
          name: 'Florida',
          population: '20.27M',
          // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
          flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
        },
        {
          name: 'Texas',
          population: '27.47M',
          // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
          flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
        }
      ];

    constructor(fb: FormBuilder, private cmdService: CmdService) {
        this.form = fb.group({
            user: new FormControl('')
        });
    }

    ngOnInit(): void {
        this.cmdService.getAllUsers().subscribe(users => {
            console.log('getAllusers');
            console.log(users);
            this.loading = false;
        });
    }

    btnDaily(): void {

    }
}
