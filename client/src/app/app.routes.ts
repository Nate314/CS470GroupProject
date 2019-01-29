import { Routes } from '@angular/router';
import { HelloWorldComponent } from './components/hello-world/hello-world.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { Constants } from './_helpers/Constants';
import { Page } from './_models/application-models/Page';
import { ComponentNames } from './_models/application-models/ComponentNames';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'app/hello-world', component: HelloWorldComponent },
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
    title: 'Hello World',
    url: '/app/hello-world',
    icon: 'none',
    component: ComponentNames.PAGE_HELLO_WORLD
});
