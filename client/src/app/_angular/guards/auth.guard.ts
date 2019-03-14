import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Utility } from 'src/app/_helpers/Utility';
import { ComponentNames } from 'src/app/_models/application-models/ComponentNames';

export class AuthGuard implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (localStorage.getItem('AuthenticationToken')) {
            return true;
        } else {
            Utility.goto(ComponentNames.PAGE_LOGIN);
            return false;
        }
    }

}
