import { Routes } from '@angular/router';
import { DatabaseViewComponent } from './components/database-view/database-view.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { Constants } from './_helpers/Constants';
import { Page } from './_models/application-models/Page';
import { ComponentNames } from './_models/application-models/ComponentNames';
import { AuthGuard } from './_angular/guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CmdComponent } from './components/cmd/cmd.component';
import { UserinfoComponent } from './components/userinfo/userinfo.component';
import { RaffleInfoComponent } from './components/raffleinfo/raffleinfo.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'app/database-view', component: DatabaseViewComponent, canActivate: [AuthGuard] },
    { path: 'app/profile', component: ProfileComponent },
    { path: 'app/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'app/cmd', component: CmdComponent, canActivate: [AuthGuard] },
    { path: 'app/userinfo', component: UserinfoComponent, canActivate: [AuthGuard] },
    { path: 'app/raffle', component: RaffleInfoComponent, canActivate: [AuthGuard] },
    { path: 'app', redirectTo: '/app/dashboard', pathMatch: 'full' },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

Constants.pages.push(<Page>{
    title: 'Not Found',
    url: '/not-found',
    icon: 'none',
    component: ComponentNames.PAGE_NOT_FOUND
});
Constants.pages.push(<Page>{
    title: 'Login',
    url: '/login',
    icon: 'none',
    component: ComponentNames.PAGE_LOGIN
});
Constants.pages.push(<Page>{
    title: 'Database View',
    url: '/app/database-view',
    icon: 'none',
    component: ComponentNames.PAGE_HELLO_WORLD
});
Constants.pages.push(<Page>{
    title: 'Dashboard',
    url: '/app/dashboard',
    icon: 'none',
    component: ComponentNames.PAGE_DASHBOARD
});
Constants.pages.push(<Page>{
    title: 'Commands',
    url: '/app/cmd',
    icon: 'none',
    component: ComponentNames.PAGE_CMD
});
Constants.pages.push(<Page>{
    title: 'Raffle',
    url: '/app/Raffle',
    icon: 'none',
    component: ComponentNames.PAGE_RAFFLE
});
