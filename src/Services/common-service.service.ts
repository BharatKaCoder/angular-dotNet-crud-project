import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserSharedData } from '../Constant/userInfo';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  private sharedUserDetails = new BehaviorSubject<UserSharedData>({userName:"", isValidedUser:false})
  currentUserDetails = this.sharedUserDetails.asObservable();

  constructor() { }

  updateShareData(values:UserSharedData) {
    this.sharedUserDetails.next(values)
  }
}
