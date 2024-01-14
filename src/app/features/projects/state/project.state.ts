import { patchState, signalState } from '@ngrx/signals';
import { Project } from '../models/project.interface';
import { Injectable } from '@angular/core';

export interface ProjectStateModel {
  projects: Project[];
  selectedProject: Project | null;
  isLoading: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProjectState {
  private state = signalState<ProjectStateModel>({
    projects: [],
    selectedProject: null,
    isLoading: false,
  });

  data = this.state.projects;
  selected = this.state.selectedProject;
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

  setSelectedProject(project: Project) {
    patchState(this.state, () => ({ selectedProject: project }));
  }
}
