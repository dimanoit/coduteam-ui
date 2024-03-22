import {
  patchState,
  signalStoreFeature,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Project } from '../features/projects/models/project.interface';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  debounceTime,
  distinctUntilChanged,
  mergeMap,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import { ProjectService } from '../features/projects/services/project.service';
import { inject } from '@angular/core';
import { ProjectSearchRequest } from '../features/projects/models/project-search-request.interface';
import { CreateProjectRequest } from '../features/projects/models/create-project.interface';

type ProjectState = {
  projects: Project[];
  selectedProject: Project | null;
  searchRequest: ProjectSearchRequest;
};

const initialState: ProjectState = {
  projects: [],
  selectedProject: null,
  searchRequest: { skip: 0, take: 10 },
};

export function withProjectFeature() {
  return signalStoreFeature(
    withState(initialState),
    withMethods((store, projectService = inject(ProjectService)) => ({
      updateSearchRequest(request: ProjectSearchRequest): void {
        patchState(store, (state) => ({ searchRequest: request }));
      },
      loadProjects: rxMethod<ProjectSearchRequest>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((request: ProjectSearchRequest) => {
            return projectService
              .loadProjects(request)
              .pipe(
                tap((projects) =>
                  patchState(store, () => ({ projects: projects })),
                ),
              );
          }),
        ),
      ),

      createProject: rxMethod<CreateProjectRequest>(
        pipe(
          mergeMap((request: CreateProjectRequest) => {
            return projectService.createProject(request).pipe(
              tap(() =>
                patchState(store, () => ({
                  searchRequest: { take: 10, skip: 0 },
                })),
              ),
            );
          }),
        ),
      ),

      loadSelectedProject: rxMethod<number>(
        pipe(
          distinctUntilChanged(),
          switchMap((id: number) => {
            return projectService
              .loadSelectedProject(id)
              .pipe(
                tap((project) =>
                  patchState(store, () => ({ selectedProject: project })),
                ),
              );
          }),
        ),
      ),
    })),
  );
}
