import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { playerData, teamInfo } from '../Constant/userInfo';
import { addPlayerEntry, CTOPHY_BASE_URL, getTeamList } from '../Constant/APIConstant';
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
    return this._http.get<teamInfo>(`${CTOPHY_BASE_URL}${getTeamList}`).pipe(
      catchError((error) => {
        this._toaster.error(error.error);
        return of(); // Return a fallback value or handle the error accordingly
      })
    );
  }

  addPlayerApi(payload:playerData): Observable<playerData> {
    return this._http.post<playerData>(`${CTOPHY_BASE_URL}${addPlayerEntry}`,payload).pipe(
      catchError((error)=> {
        this._toaster.error(error.error);
        return of();
      })
    )
  }
}
