import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.interface';
import { ProjectSearchRequest } from '../models/project-search-request.interface';
import { toHttpParams } from '../../../core/utils/http-params.util';
import { CreateProjectRequest } from '../models/create-project.interface';

@Injectable()
export class ProjectService {
  private readonly resourcePath = '/projects';

  constructor(private http: HttpClient) {}

  getProjects(params?: ProjectSearchRequest): Observable<Project[]> {
    params = params ?? { skip: 0, take: 9 };
    const httpParams = toHttpParams(params);
    return this.http.get<Project[]>(this.resourcePath, {
      params: httpParams,
    });
  }

  createProject(request: CreateProjectRequest): Observable<void> {
    return this.http.post<void>(this.resourcePath, request);
  }
}
