import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Project } from '../models/project.interface';
import { ProjectSearchRequest } from '../models/project-search-request.interface';
import { toHttpParams } from '../../../core/utils/http-params.util';
import { CreateProjectRequest } from '../models/create-project.interface';
import { Router } from '@angular/router';
import { State } from '../../../state';

@Injectable()
export class ProjectService {
  private readonly resourcePath = '/projects';

  constructor(
    private http: HttpClient,
    private router: Router,
    private state: State,
  ) {}

  loadProjects(
    params: ProjectSearchRequest = { skip: 0, take: 5 },
    join = false,
  ): Observable<void> {
    const httpParams = toHttpParams(params);

    return this.http
      .get<Project[]>(this.resourcePath, {
        params: httpParams,
      })
      .pipe(map((projects) => this.state.project.setProjects(projects, join)));
  }

  loadSelectedProject(id: number): Observable<void> {
    return this.http
      .get<Project>(`${this.resourcePath}/${id}`)
      .pipe(map((project) => this.state.project.setSelectedProject(project)));
  }

  createProject(request: CreateProjectRequest): Observable<void> {
    return this.http
      .post<void>(this.resourcePath, request)
      .pipe(switchMap(() => this.loadProjects()));
  }

  remove(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.resourcePath}/${id}`)
      .pipe(switchMap(() => this.loadProjects()));
  }
}
