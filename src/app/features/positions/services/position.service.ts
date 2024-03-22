import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PositionDto } from '../models/position-dto.interface';
import { PositionSearchRequest } from '../models/position-search-request.interface';
import { toHttpParams } from '../../../core/utils/http-params.util';
import { CreatePositionRequest } from '../models/create-position-request.interface';

@Injectable({ providedIn: 'root' })
export class PositionService {
  private readonly resourcePath = '/positions';
  private http = inject(HttpClient);

  createPosition(request: CreatePositionRequest): Observable<void> {
    return this.http.post<void>(this.resourcePath, request);
  }

  loadSelectedPosition(id: number): Observable<PositionDto> {
    return this.http.get<PositionDto>(`${this.resourcePath}/${id}`);
  }

  loadPositions(params?: PositionSearchRequest): Observable<PositionDto[]> {
    params = params ?? { skip: 0, take: 5, withApplicationStatus: true };
    params.withApplicationStatus = true;
    const httpParams = toHttpParams(params);

    return this.http.get<PositionDto[]>(this.resourcePath, {
      params: httpParams,
    });
  }

  removePosition(positionId: number) {
    return this.http.delete<void>(`${this.resourcePath}/${positionId}`);
  }
}
