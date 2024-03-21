import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.interface';
import { ProjectSearchRequest } from '../models/project-search-request.interface';
import { toHttpParams } from '../../../core/utils/http-params.util';
import { CreateProjectRequest } from '../models/create-project.interface';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly resourcePath = '/projects';
  private http = inject(HttpClient);

  loadProjects(
    params: ProjectSearchRequest = { skip: 0, take: 5 },
  ): Observable<Project[]> {
    const httpParams = toHttpParams(params);

    return this.http.get<Project[]>(this.resourcePath, {
      params: httpParams,
    });
  }

  loadSelectedProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.resourcePath}/${id}`);
  }

  createProject(request: CreateProjectRequest): Observable<void> {
    return this.http.post<void>(this.resourcePath, request);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.resourcePath}/${id}`);
  }
}
