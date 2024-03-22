import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplyOnPositionRequest } from '../models/apply-on-position-request.interface';
import { PositionDto } from '../models/position-dto.interface';
import { ChangePositionApplyStatusRequest } from '../models/change-position-apply-status-request.interface';

@Injectable({ providedIn: 'root' })
export class PositionApplyService {
  private readonly resourcePath = '/position-applies';
  private http = inject(HttpClient);

  applyOnPosition(request: ApplyOnPositionRequest): Observable<void> {
    return this.http.post<void>(this.resourcePath, request);
  }

  loadMyApplications(): Observable<PositionDto[]> {
    return this.http.get<PositionDto[]>(this.resourcePath);
  }

  changePositionApplyStatus(
    request: ChangePositionApplyStatusRequest,
  ): Observable<void> {
    return this.http.patch<void>(`${this.resourcePath}/status`, request);
  }
}
