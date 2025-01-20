import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { teamInfo } from '../Constant/userInfo';
import { CTOPHY_BASE_URL, GetTeamList } from '../Constant/APIConstant';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CtrophyHttpService {

  constructor(
    private _http:HttpClient,
    private _toaster:ToastrService
  ) { }

  getTeamList(): Observable<teamInfo> {
    return this._http.get<teamInfo>(`${CTOPHY_BASE_URL}${GetTeamList}`).pipe(
      catchError((error) => {
        this._toaster.error(error.error);
        return of(); // Return a fallback value or handle the error accordingly
      })
    );
  }
}
