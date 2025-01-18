import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IUserLogin, IUserRegistration } from '../Constant/userInfo';
import { BASE_URL, DeleteUserApi, GetAllUserApi, LoginAuth } from '../Constant/APIConstant';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getUserList(): Observable<IUserRegistration[]> {
    return this._http.get<IUserRegistration[]>(BASE_URL + GetAllUserApi);
  }

  registerNewUser(user: IUserRegistration): Observable<any> {
    return this._http.post<any>(BASE_URL + GetAllUserApi, user, {
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

  login(user:IUserLogin): Observable<any> {
    return this._http.post<any>(BASE_URL + LoginAuth, user, {
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

  DeleteUserApi(id:any): Observable<any> {
    return this._http.delete<any>(`${BASE_URL + GetAllUserApi}/${id}`, {
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
