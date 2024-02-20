import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map, Observable, tap } from 'rxjs';
import { ApplyOnPositionRequest } from '../models/apply-on-position-request.interface';
import { PositionDto } from '../models/position-dto.interface';
import { State } from '../../../state';

@Injectable()
export class PositionApplyService {
  private readonly resourcePath = '/position-applies';

  constructor(
    private http: HttpClient,
    private state: State,
  ) {}

  applyOnPosition(request: ApplyOnPositionRequest): Observable<void> {
    this.state.startLoading();
    return this.http
      .post<void>(this.resourcePath, request)
      .pipe(finalize(() => this.state.endLoading()));
  }

  loadMyApplications(): Observable<void> {
    return this.http
      .get<PositionDto[]>(this.resourcePath)
      .pipe(
        map((positions) => this.state.position.setMyApplications(positions)),
      );
  }
}
