import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { userinfoService } from 'src/app/services/userinfo.service';
import { CmdService } from 'src/app/services/cmd.service';
import { User } from 'src/app/_models/dtos/User';
import { Utility } from 'src/app/_helpers/Utility';
import { StatusCodes } from 'src/app/_models/application-models/StatusCodes';
import { send } from 'q';

@Component({
    selector: 'app-cmd',
    templateUrl: './cmd.component.html'
})
export class CmdComponent implements OnInit {

    form: FormGroup;
    loading = true;
    error: string;
    feedback: string;

    selectedUser: User;
    allUsers: User[];

    constructor(fb: FormBuilder,
        private userInfoService: userinfoService,
        private cmdService: CmdService) {
        this.form = fb.group({
            user: new FormControl(''),
            amount: new FormControl(0)
        });
    }

    ngOnInit(): void {
        this.userInfoService.getAllUsers().subscribe(users => {
            this.userInfoService.getAllResources().subscribe(resources => {
                console.log('getAllusers');
                console.log(users);
                users.forEach(user => {
                    resources.forEach(resource => {
                        if (resource.ResourceID === user.ResourceID) {
                            user.ProfilePictureURL = resource.Link;
                        }
                    });
                });
                this.allUsers = users;
                this.loading = false;
            });
        });
    }

    userChosen(user: User) {
        this.selectedUser = user;
    }

    btnDaily(): void {
        this.cmdService.daily(Utility.getDiscordUserID()).subscribe(response => {
            this.feedback = 'You received your credits for the day!';
        }, data => {
            if (data.status === StatusCodes.IM_A_TEAPOT) {
                this.feedback = '';
                this.error = 'You already did your daily today!';
            }
            if (data.status === StatusCodes.RANGE_NOT_SATISFIABLE) {
                this.feedback = '';
                this.error = 'You cannot transfer a negative amount of currency!';
            }
        });
    }

    btnTransfer(): void {
        const senderid = Utility.getDiscordUserID();
        if (this.selectedUser.DiscordUserID !== senderid) {
            const amount = this.form.controls['amount'].value;
            const receiver = this.selectedUser;
            this.cmdService.transfer(Utility.getDiscordUserID(), `${receiver.DiscordUserID}`,
            Number(amount)).subscribe(response => {
                this.error = '';
                this.feedback = `You transferred ${amount} credits to
                    ${receiver.UserName}#${receiver.UserHash}`;
            }, data => {
                this.error = 'Transfer was unsuccessful.';
                this.feedback = '';
            });
        } else {
            this.error = 'You cannot transfer credits to yourself.';
        }
    }
}
