import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map, Observable, switchMap, tap } from 'rxjs';
import { Project } from '../models/project.interface';
import { ProjectSearchRequest } from '../models/project-search-request.interface';
import { toHttpParams } from '../../../core/utils/http-params.util';
import { CreateProjectRequest } from '../models/create-project.interface';
import { ProjectState } from '../state/project.state';
import { Router } from '@angular/router';

@Injectable()
export class ProjectService {
  private readonly resourcePath = '/projects';

  constructor(
    private http: HttpClient,
    private router: Router,
    private projectState: ProjectState,
  ) {}

  loadProjects(params?: ProjectSearchRequest, join = false): Observable<void> {
    params = params ?? { skip: 0, take: 5 };
    const httpParams = toHttpParams(params);

    this.projectState.setIsLoading(true);
    return this.http
      .get<Project[]>(this.resourcePath, {
        params: httpParams,
      })
      .pipe(
        tap((projects) => this.projectState.setProjects(projects, join)),
        finalize(() => this.projectState.setIsLoading(false)),
        map(() => void 0),
      );
  }

  loadSelectedProject(id: number): Observable<void> {
    this.projectState.setIsLoading(true);
    return this.http.get<Project>(`${this.resourcePath}/${id}`).pipe(
      tap((project) => this.projectState.setSelectedProject(project)),
      finalize(() => this.projectState.setIsLoading(false)),
      map(() => void 0),
    );
  }

  createProject(request: CreateProjectRequest): Observable<void> {
    return this.http
      .post<void>(this.resourcePath, request)
      .pipe(switchMap(() => this.loadProjects()));
  }

  remove(id: number): Observable<void> {
    this.projectState.setIsLoading(true);
    return this.http
      .delete<void>(`${this.resourcePath}/${id}`)
      .pipe(switchMap(() => this.loadProjects()));
  }

  viewProjectDetails(projectId: number): void {
    this.router.navigate(['/projects', projectId]);
  }
}
