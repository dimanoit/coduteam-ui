import { Injectable } from '@angular/core';
import { mockedData } from '../../../../mocks/mock_projects';

@Injectable()
export class ProjectService {
  mockedData = mockedData;
}
