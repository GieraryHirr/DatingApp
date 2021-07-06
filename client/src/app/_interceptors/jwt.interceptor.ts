import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: User;

    //Set currentUser from account.service to currentUser variable here
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);
    //Checking if we have an current user we want to clone intercept and add our authentication header
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          //Attache our token to every request when we are logged in, and send that up with our request
                        //Be carefoul about whitespace after Baerer, it must be there!
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    }

    //Becouse we cloned request, it will be returned with authorization, if we are logged in
    return next.handle(request);
  }
}
