import { Page } from '../_models/application-models/Page';
import { Router } from '@angular/router';

export class Constants {
    public static API_URL = 'http://localhost:5000';
    public static pages: Page[] = [];
    public static router: Router;
}
