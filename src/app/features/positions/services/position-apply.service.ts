import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PositionState } from '../position.state';
import { finalize, Observable } from 'rxjs';
import { ApplyOnPositionRequest } from '../models/apply-on-position-request.interface';

@Injectable()
export class PositionApplyService {
  private readonly resourcePath = '/position-applies';

  constructor(
    private http: HttpClient,
    private positionState: PositionState,
  ) {}

  applyOnPosition(request: ApplyOnPositionRequest): Observable<void> {
    this.positionState.setIsLoading(true);
    return this.http
      .post<void>(this.resourcePath, request)
      .pipe(finalize(() => this.positionState.setIsLoading(false)));
  }
}
