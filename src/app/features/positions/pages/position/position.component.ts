import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-vacancy',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionComponent {}
