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
    return this._http.post<any>(BASE_URL + GetAllUserApi, user).pipe(
      catchError(error => {
        console.error('Error occurred during user registration:', error);
        return throwError(() => new Error('Registration failed. Please try again later.'));
      })
    );
  }

  login(user:IUserLogin): Observable<any> {
    return this._http.post<any>(BASE_URL + LoginAuth, user).pipe(
      catchError(error => {
        console.error('Error occurred during user registration:', error);
        return throwError(() => new Error('Registration failed. Please try again later.'));
      })
    );
  }

  DeleteUserApi(id:any): Observable<any> {
    return this._http.delete<any>(`${BASE_URL + GetAllUserApi}/${id}`).pipe(
      catchError(error => {
        console.error('Error occurred during user registration:', error);
        return throwError(() => new Error('Registration failed. Please try again later.'));
      })
    );
  }

  EditUserApi(id:any) {
    return this._http.get<any>(`${BASE_URL}${GetAllUserApi}/${id}`).pipe(
      catchError(error => {
        console.error('Error occurred during user update:', error);
        return throwError(() => new Error('Update failed. Please try again later.'));
      })
    );
  }

  UpdateUserApi(id: number, updatedUser: any): Observable<any> {
    return this._http.put<any>(`${BASE_URL}${GetAllUserApi}/${id}`, updatedUser)
    .pipe(
      catchError(error => {
        console.error('Error occurred during user update:', error);
        return throwError(() => new Error('Update failed. Please try again later.'));
      })
    );
  }
}
