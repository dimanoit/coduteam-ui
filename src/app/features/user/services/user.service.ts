import { Injectable } from '@angular/core';
import {
  User,
  AuthDto,
  AccountRegistrationDto,
} from '../models/user.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  register(authDto: AuthDto): Observable<void> {
    return this.http.post<void>('/register', authDto);
  }

  finishRegistration(
    finishRegistrationDto: AccountRegistrationDto,
  ): Observable<void> {
    return this.http.post<void>('/users/activation', finishRegistrationDto);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>('/users');
  }
}
