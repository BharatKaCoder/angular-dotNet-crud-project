import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUserLogin, IUserRegistration, UserSharedData } from '../../Constant/userInfo';
import { Router } from '@angular/router';
import { CommonServiceService } from '../../Services/common-service.service';
import { HttpService } from '../../Services/http.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  registrationForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    role: new FormControl(''),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });

  registrationValue: IUserRegistration[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _router: Router,
    private _commonService: CommonServiceService,
    private _httpService: HttpService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const container = document.querySelector('.container');
      const registerBtn = document.querySelector('.register-btn');
      const loginBtn = document.querySelector('.login-btn');

      if (registerBtn && container) {
        registerBtn.addEventListener('click', () => {
          container.classList.add('active');
        });
      }

      if (loginBtn && container) {
        loginBtn.addEventListener('click', () => {
          container.classList.remove('active');
        });
      }
    }
  }

  onLogin() {
    const loginValue: IUserLogin = this.loginForm.value;
    this._httpService.login(loginValue).subscribe((res) => {
        if(res) {
          if(res.success) {
            this._toastr.success("Successful login!")
          }
          const shareableDetails: UserSharedData = {
            userName: res.result.userName,
            isValidedUser: true,
          };
          sessionStorage.setItem("token",JSON.stringify(res.result.token));
          this._commonService.updateShareData(shareableDetails);
          this._router.navigate(['/dashboard']);
        }
      },
      (error)=> {
      this._toastr.error(error);
    });
  }

  onRegister() {
    if (this.registrationForm.value.role === '') {
      this.registrationForm.value['role'] = 'customer';
    }
    this._httpService
      .registerNewUser(this.registrationForm.value)
      .subscribe((value) => {
        if(value.success) {
          this._toastr.success("Successfully registered!");
        }
      }, (error)=>{
        this._toastr.error(error);
      });
  }
}
