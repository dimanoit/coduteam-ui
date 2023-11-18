import { Injectable } from '@angular/core';
import { mockedData } from '../models/mock_projects';

@Injectable()
export class ProjectService {
  mockedData = mockedData;

  constructor() {}
}
