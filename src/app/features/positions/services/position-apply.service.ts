import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map, Observable } from 'rxjs';
import { ApplyOnPositionRequest } from '../models/apply-on-position-request.interface';
import { PositionDto } from '../models/position-dto.interface';
import { State } from '../../../state';
import { ChangePositionApplyStatusRequest } from '../models/change-position-apply-status-request.interface';

@Injectable()
export class PositionApplyService {
  private readonly resourcePath = '/position-applies';
  private http = inject(HttpClient);
  private state = inject(State);

  applyOnPosition(request: ApplyOnPositionRequest): Observable<void> {
    return this.http.post<void>(this.resourcePath, request);
  }

  loadMyApplications(): Observable<void> {
    return this.http
      .get<PositionDto[]>(this.resourcePath)
      .pipe(
        map((positions) => this.state.position.setMyApplications(positions))
      );
  }

  changePositionApplyStatus(request: ChangePositionApplyStatusRequest) {
    return this.http.patch<void>(`${this.resourcePath}/status`, request);
  }
}
