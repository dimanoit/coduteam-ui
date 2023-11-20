import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionComponent {}
