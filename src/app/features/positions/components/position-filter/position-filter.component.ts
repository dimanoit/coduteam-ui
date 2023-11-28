import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProjectCategoryDropdownComponent } from '../../../projects/components/project-category-dropdown/project-category-dropdown.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-position-filter',
  templateUrl: './position-filter.component.html',
  styleUrls: ['./position-filter.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ProjectCategoryDropdownComponent,
    InputTextModule,
    DropdownModule,
    FormsModule,
  ],
})
export class PositionFilterComponent implements OnInit {
  specialities: Speciality[] | undefined;
  selectedSpeciality: Speciality | undefined;

  ngOnInit() {
    this.specialities = [
      { name: '.Net', code: '.Net' },
      { name: 'Golang', code: 'Golang' },
      { name: 'Java', code: 'Java' },
      { name: 'Javascript', code: 'Javascript' },
      { name: 'Typescript', code: 'Typescript' },
    ];
  }
}

interface Speciality {
  name: string;
  code: string;
}
