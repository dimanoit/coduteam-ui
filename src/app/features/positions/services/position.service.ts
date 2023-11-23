import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { mockedPositions } from '../../../../mocks/mocked_positions';
import { PositionDto } from '../models/position-dto.interface';
import { PositionSearchRequest } from '../models/position-search-request.interface';

@Injectable()
export class PositionService {
  private apiUrl = 'your-api-url'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getPositions(params: PositionSearchRequest): Observable<PositionDto[]> {
    const projectIds = params.projectsIds || [];
    return of(mockedPositions).pipe(
      map((projects) =>
        projects.filter((position) => projectIds.includes(position.projectId)),
      ),
    );
  }

  // TODO uncomment when BE will be ready
  // const httpParams = toHttpParams(params);
  // return this.http.get<PositionDto[]>(`${this.apiUrl}/positions`, {
  //   params: httpParams,
  // });
}
