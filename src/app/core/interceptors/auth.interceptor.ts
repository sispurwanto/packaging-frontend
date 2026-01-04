import { 
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse 
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();
  const router = inject(Router);

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  // return next(req);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {

      if (err.status === 401 || err.status === 403) {
        // 🔥 TOKEN INVALID / EXPIRED
        localStorage.clear();
        router.navigate(['/login']);
      }

      return throwError(() => err);
    })
  );

};
