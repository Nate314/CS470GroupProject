import { ComponentNames } from '../_models/application-models/ComponentNames';
import { Constants } from './Constants';
import * as decode from 'jwt-decode';

export class Utility {

    public static getDiscordUserID() {
        return decode(localStorage.getItem('AuthenticationToken'))['DiscordUserID'];
    }

    public static replaceAll(str: string, oldstr: string, newstr: string): string {
        let result = str.replace(oldstr, newstr);
        if (result.indexOf(oldstr) !== -1) {
            result = Utility.replaceAll(result, oldstr, newstr);
        }
        return result;
    }

    public static goto(component: ComponentNames) {
        Constants.pages.forEach(page => {
            if (page.component === component) {
                Constants.router.navigateByUrl(page.url);
            }
        });
    }
}
