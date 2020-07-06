import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let token = this.authenticationService.getToken();

        if (token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}
