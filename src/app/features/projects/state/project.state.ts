import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Project } from '../models/project.interface';

type ProjectState = {
  projects: Project[];
  selectedProject: Project | null;
};

const initialState: ProjectState = {
  projects: [],
  selectedProject: null,
};

export const ProjectStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setProjects(projects: Project[], join: boolean) {
      const projectsUpdated = join
        ? [...store.projects(), ...projects]
        : projects;
      patchState(store, () => ({ projects: projectsUpdated }));
    },
    setSelectedProject(project: Project) {
      patchState(store, () => ({ selectedProject: project }));
    },
  })),
);
