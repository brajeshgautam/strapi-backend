import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  let token: string | null = null;

  // Only access localStorage if in the browser
  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('jwt_token');
  }

  const strapiApiUrl = 'http://localhost:1337/api'; // Your Strapi API base URL

  // Clone the request and add the authorization header if token exists and the request is to your API
  if (token && req.url.startsWith(strapiApiUrl)) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);
  }

  // If no token or request is not to your API, pass the original request
  return next(req);
};
