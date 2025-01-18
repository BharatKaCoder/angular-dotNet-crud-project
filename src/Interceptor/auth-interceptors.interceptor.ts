import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CommonServiceService } from '../Services/common-service.service';
import { finalize } from 'rxjs';

export const authInterceptorsInterceptor: HttpInterceptorFn = (req, next) => {

  const loaderService = inject(CommonServiceService);
  loaderService.showLoader();
  const token = sessionStorage.getItem("token");
  const newReq = req.clone({
    setHeaders : {
      // Authorization: `Bearer ${token}` // this is when we have autherization on API
      'Content-Type': 'application/json'
    }
  })
  return next(newReq).pipe(
    finalize(()=>{
      loaderService.hideLoader();
    })
  )
};
