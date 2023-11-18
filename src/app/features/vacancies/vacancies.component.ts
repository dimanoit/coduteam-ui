import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VacancyComponent } from './vacancy/vacancy.component';
import { VacancyFilterComponent } from './vacancy-filter/vacancy-filter.component';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss'],
  imports: [VacancyComponent, VacancyFilterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class VacanciesComponent {}
