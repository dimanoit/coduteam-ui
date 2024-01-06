import { patchState, signalState } from '@ngrx/signals';
import { Project } from '../models/project.interface';

export const projectState = signalState({
  projects: [] as Project[],
  isLoading: false,
});
