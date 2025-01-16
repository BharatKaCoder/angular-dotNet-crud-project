import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IUserRegistration } from '../Constant/userInfo';
import { GetAllUserApi } from '../Constant/APIConstant';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getUserList(): Observable<IUserRegistration[]> {
    return this._http.get<IUserRegistration[]>(GetAllUserApi);
  }

  registerNewUser(user: IUserRegistration): Observable<any> {
    return this._http.post<any>(GetAllUserApi, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(error => {
        console.error('Error occurred during user registration:', error);
        return throwError(() => new Error('Registration failed. Please try again later.'));
      })
    );
  }
}
