import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUserLogin, IUserRegistration, UserSharedData } from '../../Constant/userInfo';
import { Router } from '@angular/router';
import { CommonServiceService } from '../../Services/common-service.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  registrationForm: FormGroup = new FormGroup ({
    userName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.email]),
    role: new FormControl(""),
    password: new FormControl("", [Validators.required,Validators.minLength(5)])
  });

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(""),
    password: new FormControl("")
  });

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _router: Router,
    private _commonService: CommonServiceService
  ) {}

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)) {
      const container = document.querySelector('.container');
      const registerBtn = document.querySelector('.register-btn');
      const loginBtn = document.querySelector('.login-btn');
  
      if(registerBtn && container) {
        registerBtn.addEventListener('click', () => {
          container.classList.add('active');
        });
      }
  
      if(loginBtn && container) {
        loginBtn.addEventListener('click', () => {
          container.classList.remove('active');
        });
      }
    }
  }

  onLogin() {
    const loginValue: IUserLogin = this.loginForm.value;
    const localStrValue:any = localStorage.getItem('localRegistration');
    const parsedValue = JSON.parse(localStrValue);
    if (loginValue.userName === parsedValue.userName && loginValue.password === parsedValue.password) {
      const shareableDetails: UserSharedData = { 
        userName: parsedValue.userName, 
        isValidedUser: true
      };
      this._commonService.updateShareData(shareableDetails);
      this._router.navigate(['/dashboard']);
    }
  }

  onRegister() {
    const registrationValue: IUserRegistration = this.registrationForm.value;
    if(registrationValue.role === "") {
      registrationValue['role'] = "Customer"
    }
    localStorage.setItem('localRegistration', JSON.stringify(registrationValue))
  }
}
