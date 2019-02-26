import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../_helpers/Constants';

export class BaseService {

    API_URL = Constants.API_URL;

    getHttpOptions(): any {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };
        return httpOptions;
    }

    constructor(http: HttpClient) {
        setInterval(() => {
            this.API_URL = Constants.API_URL;
        }, 100);
    }
}
