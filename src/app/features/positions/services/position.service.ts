import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map, Observable } from 'rxjs';
import { PositionDto } from '../models/position-dto.interface';
import { PositionSearchRequest } from '../models/position-search-request.interface';
import { toHttpParams } from '../../../core/utils/http-params.util';
import { State } from '../../../state';
import { CreatePositionRequest } from '../models/create-position-request.interface';

@Injectable()
export class PositionService {
  private readonly resourcePath = '/positions';
  private http = inject(HttpClient);
  private state = inject(State);

  createPosition(request: CreatePositionRequest): Observable<void> {
    return this.http.post<void>(this.resourcePath, request);
  }

  loadSelectedPosition(id: number): Observable<void> {
    return this.http
      .get<PositionDto>(`${this.resourcePath}/${id}`)
      .pipe(
        map((position) => this.state.position.setSelectedProject(position)),
      );
  }

  loadPositions(params?: PositionSearchRequest): Observable<void> {
    params = params ?? { skip: 0, take: 5, withApplicationStatus: true };
    params.withApplicationStatus = true;
    const httpParams = toHttpParams(params);

    this.state.startLoading();
    return this.http
      .get<PositionDto[]>(this.resourcePath, {
        params: httpParams,
      })
      .pipe(
        map((positions) => this.state.position.setPositions(positions)),
        finalize(() => this.state.endLoading()),
      );
  }

  removePosition(positionId: number) {
    this.state.startLoading();
    return this.http
      .delete<void>(`${this.resourcePath}/${positionId}`)
      .pipe(finalize(() => this.state.endLoading()));
  }
}
