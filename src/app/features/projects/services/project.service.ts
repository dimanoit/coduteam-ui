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
    params = params ?? { skip: 0, take: 9 };
    const httpParams = toHttpParams(params);
    return this.http.get<Project[]>('/projects', {
      params: httpParams,
    });
  }
}
