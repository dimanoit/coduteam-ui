import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map, Observable, tap } from 'rxjs';
import { PositionDto } from '../models/position-dto.interface';
import { PositionSearchRequest } from '../models/position-search-request.interface';
import { toHttpParams } from '../../../core/utils/http-params.util';
import { State } from '../../../state';

@Injectable()
export class PositionService {
  private readonly resourcePath = '/positions';

  constructor(
    private http: HttpClient,
    private state: State,
  ) {}

  loadPositions(params?: PositionSearchRequest): Observable<void> {
    params = params ?? { skip: 0, take: 5, withApplicationStatus: true };
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
}
