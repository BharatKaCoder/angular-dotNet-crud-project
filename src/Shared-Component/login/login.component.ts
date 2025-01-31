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
    if(this.loginForm.valid) {
      this._httpService.login(loginValue).subscribe((res) => {
          if(res) {
            if(res.success) {
              this._toastr.success("Successful login!")
            }
            const shareableDetails: UserSharedData = {
              userName: res.result.userName,
              isValidedUser: true,
              role:res.result.role
            };
            sessionStorage.setItem("token",JSON.stringify(res.result.token));
            this._commonService.updateShareData(shareableDetails);
            this.loginForm.reset();
            if(res.result?.token) {
              this._router.navigate(['/teams']);
            }
          }
        },
        (error)=> {
        this._toastr.error(error);
      });
    } else {
      this._toastr.warning("Enter correct details!")
    }
  }

  onRegister() {
    if(this.registrationForm.valid) {
      if (this.registrationForm.value.role === '') {
        this.registrationForm.value['role'] = 'customer';
      }
      this._httpService
        .registerNewUser(this.registrationForm.value)
        .subscribe((value) => {
          if(value.success) {
            this._toastr.success("Successfully registered!");
            const btnClicked = document.getElementById("loginBtn");
            if(btnClicked) {
              btnClicked.click();
            }
            this.registrationForm.reset();
          }
        }, (error)=>{
          this._toastr.error(error);
      });
    } else {
      this._toastr.warning("Invalid input value!")
    }
  }
}
