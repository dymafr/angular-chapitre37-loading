import { LoadingService } from './../services/loading.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  private httpRequestCount$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private loadingService: LoadingService) {
    this.httpRequestCount$.subscribe( i => {
      if (i === 0) {
        this.loadingService.isLoading$.next(false);
      } else {
        this.loadingService.isLoading$.next(true);
      }
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.httpRequestCount$.next(this.httpRequestCount$.value + 1);
    return next.handle(req).pipe(
      tap( (httpEvent: HttpEvent<any>) => {
        if (httpEvent instanceof HttpResponse) {
          this.httpRequestCount$.next(this.httpRequestCount$.value - 1);
        }
      }),
      catchError( err => {
        this.httpRequestCount$.next(this.httpRequestCount$.value - 1);
        return of(err);
      })
    );
  }
}
