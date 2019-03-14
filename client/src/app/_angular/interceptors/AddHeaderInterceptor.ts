import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class AddHeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request to add the new header
        const token = localStorage.getItem('AuthenticationToken');
        let clonedRequest = req.clone();
        if (token) {
            clonedRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + JSON.parse(token)) });
        }

        // Pass the cloned request instead of the original request to the next handle
        return next.handle(clonedRequest).pipe(tap(_ => console.log(_)));
    }
}

// https://stackoverflow.com/questions/34464108/angular-set-headers-for-every-request
