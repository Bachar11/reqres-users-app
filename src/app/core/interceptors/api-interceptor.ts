import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {

  const clonedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
    }
  });

  return next(clonedReq);
};
