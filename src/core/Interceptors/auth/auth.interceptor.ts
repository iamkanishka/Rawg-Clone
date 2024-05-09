import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    // headers: req.headers.set('Authorization', 'Bearer' + environment.API_KEY),
    params: req.params
      ? req.params.set('key', environment.API_KEY)
      : new HttpParams().set('key', environment.API_KEY),
  });

  return next(req);
};
