import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.interface';
import { ProjectSearchRequest } from '../models/project-search-request.interface';
import { toHttpParams } from '../../../core/utils/http-params.util';

@Injectable()
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjects(params?: ProjectSearchRequest): Observable<Project[]> {
    if (params) {
      const httpParams = toHttpParams(params);
      return this.http.get<Project[]>('/api/projects', {
        params: httpParams,
      });
    }

    return this.http.get<Project[]>('/api/projects');
  }
}
