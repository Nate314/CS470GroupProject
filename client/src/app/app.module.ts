import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DatabaseViewComponent } from './components/database-view/database-view.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HelloWorldService } from './services/hello-world.service';
import { AppRoutingModule } from './app-routing.module';
import { AddHeaderInterceptor } from './_angular/interceptors/AddHeaderInterceptor';
import { AuthenticationService } from './services/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './_angular/guards/auth.guard';
import { Constants } from './_helpers/Constants';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardService } from './services/dashboard.service';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableComponent } from './_angular/components/mat-table/mat-table.component';
import { MatInputComponent } from './_angular/components/mat-input/mat-input.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CmdComponent } from './components/cmd/cmd.component';
import { CmdService } from './services/cmd.service';
import { UserinfoComponent } from './components/userinfo/userinfo.component';
import { userinfoService } from './services/userinfo.service';
import { HeadernavComponent } from './components/headernav/headernav.component';
import { RaffleInfoComponent } from './components/raffleinfo/raffleinfo.component';
import { RaffleInfoService } from './services/raffle.service';
import { ProfileComponent } from './components/profile/profile.component';
import { SocialmediasComponent } from './components/socialmedias/socialmedias.component';
import { MatListItem } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    DatabaseViewComponent,
    DashboardComponent,
    MatTableComponent,
    MatInputComponent,
    CmdComponent,
    UserinfoComponent,
    HeadernavComponent,
    RaffleInfoComponent,
    ProfileComponent,
    SocialmediasComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    HttpClient,
    AuthGuard,
    HelloWorldService,
    AuthenticationService,
    DashboardService,
    CmdService,
    userinfoService,
    RaffleInfoService,
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor() {
    Constants.API_URL = 'http://' + window['hostip'];
  }

}
