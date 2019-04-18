import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headernav',
  templateUrl: './headernav.component.html',
  styleUrls: ['./headernav.component.css']
})
export class HeadernavComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  navigateToComponent(pageName) {
    if(pageName === 'userInfo') {
        this.router.navigate(['/app/userinfo']);
    }

    if(pageName === 'dashboard') {
        this.router.navigate(['/app/dashboard']);
    }

    if(pageName === 'raffle') {
      this.router.navigate(['/app/raffle']);
  }

    if(pageName === 'login') {
        this.router.navigate(['/login']);
    }
  }

}
