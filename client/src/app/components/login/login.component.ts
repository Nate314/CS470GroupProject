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

    error: string;
    form: FormGroup;
    tokenLogin = true;
    SamURL = 'https://cdn.discordapp.com/attachments/540716166058999833/552676047129280539/Sam.png';
    RonnyURL = 'https://cdn.discordapp.com/attachments/540716166058999833/552674934225240074/Ronny.png';
    NathanURL = 'https://cdn.discordapp.com/attachments/540716166058999833/552676535178493963/Painting.png';

    constructor(private authenticationService: AuthenticationService, fb: FormBuilder) {
        this.form = fb.group({
            token: new FormControl('', Validators.required)
        });
    }

    getWidth() {
        return window.innerWidth;
    }

    ngOnInit() {
        localStorage.clear();
    }

    getFormValue<T>(key: string): T {
        return <T> this.form.value[key];
    }

    loginLogic(component: ComponentNames) {
        console.log(this.form.controls['token'].value);
        const token = this.tokenLogin ? this.getFormValue<string>('token') : '';
        const username = !this.tokenLogin ? this.getFormValue<string>('username') : '';
        const password = !this.tokenLogin ? this.getFormValue<string>('password') : '';
        this.authenticationService.login(token, username, password).subscribe(response => {
            console.log(response['jwt']);
            localStorage.setItem('AuthenticationToken', `"${response['jwt']}"`);
            Utility.goto(component);
        }, data => {
            this.error = 'Invalid Token';
        });
    }

    btnLogin() {
        this.loginLogic(ComponentNames.PAGE_DASHBOARD);
    }

    btnDB() {
        this.loginLogic(ComponentNames.PAGE_HELLO_WORLD);
    }

    submitIfEnter(event) {
        if (event.keyCode === 13) {
            this.btnLogin();
        }
    }
}
