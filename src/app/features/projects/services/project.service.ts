import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.interface';
import { ProjectSearchRequest } from '../models/project-search-request.interface';

@Injectable()
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjects(params?: ProjectSearchRequest): Observable<Project[]> {
    return this.http.post<Project[]>('/api/projects/search', params);
  }
}
