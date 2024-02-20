import { Injectable } from '@angular/core';
import {
  User,
  AuthDto,
  AccountRegistrationDto,
} from '../models/user.interface';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { State } from '../../../state';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private state: State,
  ) {}

  register(authDto: AuthDto): Observable<void> {
    this.state.user.setIsActivation(true);
    return this.http.post<void>('/auth/register', authDto);
  }

  finishRegistration(
    finishRegistrationDto: AccountRegistrationDto,
  ): Observable<void> {
    return this.http
      .post<void>('/users/activation', finishRegistrationDto)
      .pipe(tap(() => this.state.user.setIsActivation(false)));
  }

  loadCurrentUser(): Observable<void> {
    return this.http
      .get<User>('/users')
      .pipe(map((response: User) => this.state.user.setCurrentUser(response)));
  }
}
