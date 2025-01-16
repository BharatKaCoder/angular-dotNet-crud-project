import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserRegistration } from '../Constant/userInfo';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getUserList(): Observable<IUserRegistration[]> {
    return this._http.get<IUserRegistration[]>('https://localhost:7106/api/User');
  }
}
