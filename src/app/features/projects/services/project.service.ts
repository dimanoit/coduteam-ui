import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Project } from '../models/project.interface';
import { ProjectSearchRequest } from '../models/project-search-request.interface';
import { toHttpParams } from '../../../core/utils/http-params.util';
import { mockedData } from '../../../../mocks/mock_projects';

@Injectable()
export class ProjectService {
  private apiUrl = 'your-api-url'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getProjects(params: ProjectSearchRequest): Observable<Project[]> {
    return of(mockedData).pipe(
      map((projects) =>
        projects
          .filter(
            (project) =>
              params.userId === undefined || project.ownerId === params?.userId,
          )
          .filter(
            (project) =>
              params.projectId === undefined ||
              project.id === params?.projectId,
          ),
      ),
    );
  }

  // TODO uncomment when BE will be ready
  // const httpParams = toHttpParams(params);
  // return this.http.get<Project[]>(`${this.apiUrl}/projects`, {
  //   params: httpParams,
  // });
}
