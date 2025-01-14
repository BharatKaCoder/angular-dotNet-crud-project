import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
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
}
