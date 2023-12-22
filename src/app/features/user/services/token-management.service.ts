import { Injectable } from '@angular/core';
import { AuthToken } from '../models/auth-token.interface';

@Injectable({
  providedIn: 'root',
})
export class TokenManagementService {
  removeTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  addTokens(authToken: AuthToken) {
    localStorage.setItem('token', JSON.stringify(authToken.accessToken));
    localStorage.setItem(
      'refreshToken',
      JSON.stringify(authToken.refreshToken),
    );
  }

  getAuthToken() {
    const token = localStorage.getItem('token');
    return token === null ? '' : token.replace(/"/g, '');
  }
}
