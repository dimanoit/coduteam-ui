import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PositionComponent } from '../position/position.component';
import { PositionFilterComponent } from '../../components/position-filter/position-filter.component';
import { PositionLineComponent } from '../../components/position-line/position-line.component';
import { NgForOf } from '@angular/common';
import { mockedPositions } from '../../../../../mocks/mocked_positions';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss'],
  imports: [
    PositionComponent,
    PositionFilterComponent,
    PositionLineComponent,
    NgForOf,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PositionsComponent {
  positions = mockedPositions;
}
