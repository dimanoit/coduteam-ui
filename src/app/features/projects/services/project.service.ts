import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map, Observable, switchMap, tap } from 'rxjs';
import { Project } from '../models/project.interface';
import { ProjectSearchRequest } from '../models/project-search-request.interface';
import { toHttpParams } from '../../../core/utils/http-params.util';
import { CreateProjectRequest } from '../models/create-project.interface';
import { projectState } from '../state/project.state';
import { patchState } from '@ngrx/signals';

@Injectable()
export class ProjectService {
  private readonly resourcePath = '/projects';

  constructor(private http: HttpClient) {}

  loadProjects(params?: ProjectSearchRequest): Observable<void> {
    params = params ?? { skip: 0, take: 9 };
    const httpParams = toHttpParams(params);

    this.setIsLoading(true);
    return this.http
      .get<Project[]>(this.resourcePath, {
        params: httpParams,
      })
      .pipe(
        tap((projects) => this.setProjects(projects)),
        finalize(() => this.setIsLoading(false)),
        map(() => void 0),
      );
  }

  createProject(request: CreateProjectRequest): Observable<void> {
    return this.http
      .post<void>(this.resourcePath, request)
      .pipe(switchMap(() => this.loadProjects()));
  }

  private setProjects(projects: Project[]) {
    patchState(projectState, () => ({ projects }));
  }

  private setIsLoading(isLoading: boolean) {
    patchState(projectState, () => ({ isLoading }));
  }
}
