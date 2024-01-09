import { patchState, signalState } from '@ngrx/signals';
import { Project } from '../models/project.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectState {
  private state = signalState({
    projects: [] as Project[],
    isLoading: false,
  });

  projects = this.state.projects;
  isLoading = this.state.isLoading;

  setProjects(projects: Project[], join: boolean) {
    const projectsUpdated = join
      ? [...this.state.projects(), ...projects]
      : projects;

    patchState(this.state, () => ({ projects: projectsUpdated }));
  }

  setIsLoading(isLoading: boolean) {
    patchState(this.state, () => ({ isLoading }));
  }
}
