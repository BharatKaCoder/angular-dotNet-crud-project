import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptorsInterceptor } from '../Interceptor/auth-interceptors.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(withEventReplay()),
  provideAnimationsAsync(),
  provideHttpClient(withFetch(),withInterceptors([authInterceptorsInterceptor])),
  provideAnimations(),
  provideToastr({
    timeOut: 5000,
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,
  })
  ]
};
