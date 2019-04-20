import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from './_helpers/Constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {
    Constants.router = this.router;
  }

  showHeader() {
    return !(window.location.href.includes('login') || window.location.href.includes('profile'));
  }
}
