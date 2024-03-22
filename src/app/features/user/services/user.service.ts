import { inject, Injectable } from '@angular/core';
import {
  User,
  AuthDto,
  AccountRegistrationDto,
} from '../models/user.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  register(authDto: AuthDto): Observable<void> {
    return this.http.post<void>('/auth/register', authDto);
  }

  finishRegistration(
    finishRegistrationDto: AccountRegistrationDto,
  ): Observable<void> {
    return this.http.post<void>('/users/activation', finishRegistrationDto);
  }

  loadCurrentUser(): Observable<User> {
    return this.http.get<User>('/users');
  }
}
