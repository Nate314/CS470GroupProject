import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Utility } from 'src/app/_helpers/Utility';
import { ComponentNames } from 'src/app/_models/application-models/ComponentNames';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    constructor(private authenticationService: AuthenticationService, fb: FormBuilder) {
        this.form = fb.group({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        localStorage.clear();
    }

    getFormValue<T>(key: string): T {
        return <T> this.form.value[key];
    }

    login() {
        const username = this.getFormValue<string>('username');
        const password = this.getFormValue<string>('password');
        this.authenticationService.login(username, password).subscribe(response => {
            console.log(response['jwt']);
            localStorage.setItem('AuthenticationToken', `"${response['jwt']}"`);
            Utility.goto(ComponentNames.PAGE_HELLO_WORLD);
        }, data => console.log(data));
    }
}
