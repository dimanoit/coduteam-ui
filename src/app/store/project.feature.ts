import {
  getState,
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
  searchProjectsRequest: ProjectSearchRequest;
};

export const defaultProjectSearchRequest: ProjectSearchRequest = {
  skip: 0,
  take: 10,
};

const initialState: ProjectState = {
  projects: [],
  selectedProject: null,
  searchProjectsRequest: defaultProjectSearchRequest,
};

export function withProjectFeature() {
  return signalStoreFeature(
    withState<ProjectState>(initialState),
    withMethods((store, projectService = inject(ProjectService)) => ({
      updateSearchRequest(request: ProjectSearchRequest): void {
        const state = getState(store);
        if (
          request.isPagination &&
          request.take === state.searchProjectsRequest.take &&
          request.skip === state.searchProjectsRequest.skip
        ) {
          return;
        }

        patchState(store, { searchProjectsRequest: request });
      },
      loadProjects: rxMethod<ProjectSearchRequest>(
        pipe(
          distinctUntilChanged(),
          debounceTime(300),
          tap((request) => {
            if (!request.isPagination) {
              patchState(store, { projects: [] });
            }
          }),
          switchMap((request: ProjectSearchRequest) =>
            projectService.loadProjects(request).pipe(
              tap((response) => {
                patchState(store, {
                  projects: request.isPagination
                    ? [...store.projects(), ...response]
                    : response,
                });
              }),
            ),
          ),
        ),
      ),

      createProject: rxMethod<CreateProjectRequest>(
        pipe(
          mergeMap((request: CreateProjectRequest) => {
            return projectService.createProject(request).pipe(
              tap(() =>
                patchState(store, {
                  searchProjectsRequest: defaultProjectSearchRequest,
                }),
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
                  patchState(store, { selectedProject: project }),
                ),
              );
          }),
        ),
      ),
    })),
  );
}
