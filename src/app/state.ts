import { inject, Injectable } from '@angular/core';
import { ProjectState } from './features/projects/state/project.state';
import { PositionState } from './features/positions/position.state';

@Injectable()
export class State {
  project = inject(ProjectState);
  position = inject(PositionState);
}
