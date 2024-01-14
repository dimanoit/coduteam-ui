import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { PositionComponent } from '../position/position.component';
import { PositionFilterComponent } from '../../components/position-filter/position-filter.component';
import { PositionLineComponent } from '../../components/position-line/position-line.component';
import { NgForOf } from '@angular/common';
import { PositionState } from '../../position.state';
import { PositionService } from '../../services/position.service';
import { State } from '../../../../state';

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
  providers: [PositionService, PositionState, State],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PositionsComponent implements OnInit {
  positionService = inject(PositionService);
  state = inject(State);

  ngOnInit(): void {
    this.positionService.loadPositions().subscribe();
  }
}
