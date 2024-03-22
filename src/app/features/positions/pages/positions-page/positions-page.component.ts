import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { PositionFilterComponent } from '../../components/position-filter/position-filter.component';
import { PositionLineComponent } from '../../components/position-line/position-line.component';
import { NgForOf } from '@angular/common';
import { PositionService } from '../../services/position.service';
import { State } from '../../../../store/state';
import { PositionApplyService } from '../../services/position-apply.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { PositionPageComponent } from '../position-page/position-page.component';

@Component({
  selector: 'app-positions',
  templateUrl: './positions-page.component.html',
  styleUrls: ['./positions-page.component.scss'],
  imports: [
    PositionPageComponent,
    PositionFilterComponent,
    PositionLineComponent,
    NgForOf,
    ProgressBarModule,
  ],
  providers: [PositionService, PositionApplyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PositionsPageComponent implements OnInit {
  state = inject(State);
  positions = this.state.position.positions;

  ngOnInit(): void {
    const searchRequest = this.state.position.searchRequest;
    this.state.position.loadPositions(searchRequest);
  }
}
