import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AddHeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request to add the new header
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NDg2NDQ2MDcsImV4cCI6MTU0ODY0NDY2N30.ZYzeZe6NjmIqgUToAPCoHPf5Xe-TdDP2-O6ZJDgWPFY';
        const clonedRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });

        // Pass the cloned request instead of the original request to the next handle
        return next.handle(clonedRequest);
    }
}

// https://stackoverflow.com/questions/34464108/angular-set-headers-for-every-request
