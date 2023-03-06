import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { ShowErrorAlert } from "../state/app.actions";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store, private toastr: ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('This is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            console.log('This is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          this.store.dispatch(new ShowErrorAlert(errorMsg, error));
          this.toastr.error(errorMsg, 'Error!');
          return throwError(() => errorMsg);
        }),
      );
  }

}

export const appInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  },
];
