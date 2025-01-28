import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserSharedData } from '../Constant/userInfo';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  private sharedUserDetails = new BehaviorSubject<UserSharedData>({userName:"", isValidedUser:false, role:""})
  currentUserDetails = this.sharedUserDetails.asObservable();

  private loader = new BehaviorSubject<boolean>(false);
  loaderStatus = this.loader.asObservable();

  constructor() { }

  updateShareData(values:UserSharedData) {
    this.sharedUserDetails.next(values)
  }

  showLoader() {
    this.loader.next(true);
  }

  hideLoader() {
    this.loader.next(false);
  }
}
