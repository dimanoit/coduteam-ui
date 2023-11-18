import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-vacancy-filter',
  templateUrl: './position-filter.component.html',
  styleUrls: ['./position-filter.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionFilterComponent {}
