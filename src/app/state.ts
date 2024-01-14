import { inject, Injectable } from '@angular/core';
import { ProjectState } from './features/projects/state/project.state';
import { PositionState } from './features/positions/position.state';
import { UserState } from './features/user/user.state';

@Injectable({ providedIn: 'root' })
export class State {
  project = inject(ProjectState);
  position = inject(PositionState);
  user = inject(UserState);
}
