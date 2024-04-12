import { PositionDto } from '../features/positions/models/position-dto.interface';
import { inject } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  withMethods,
  withState,
} from '@ngrx/signals';
import { PositionService } from '../features/positions/services/position.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ApplyOnPositionRequest } from '../features/positions/models/apply-on-position-request.interface';
import { distinctUntilChanged, mergeMap, pipe, switchMap, tap } from 'rxjs';
import { PositionApplyService } from '../features/positions/services/position-apply.service';
import { ChangePositionApplyStatusRequest } from '../features/positions/models/change-position-apply-status-request.interface';
import { CreatePositionRequest } from '../features/positions/models/create-position-request.interface';
import { PositionSearchRequest } from '../features/positions/models/position-search-request.interface';

type PositionState = {
  positions: PositionDto[];
  searchPositionsRequest: PositionSearchRequest;
  selectedPosition: PositionDto | null;
  myApplications: PositionDto[];
  selectedPositionId: number | null;
};

const defaultSearchRequest: PositionSearchRequest = {
  skip: 0,
  take: 10,
};

const initialState: PositionState = {
  positions: [],
  selectedPosition: null,
  myApplications: [],
  searchPositionsRequest: defaultSearchRequest,
  selectedPositionId: null,
};

export function withPositionFeature() {
  return signalStoreFeature(
    withState(initialState),
    withMethods(
      (
        store,
        positionApplyService = inject(PositionApplyService),
        positionService = inject(PositionService),
      ) => ({
        updateSelectedPositionId(positionId: number) {
          patchState(store, () => ({ selectedPositionId: positionId }));
        },

        applyOnPosition: rxMethod<ApplyOnPositionRequest>(
          pipe(
            distinctUntilChanged(),
            switchMap((request: ApplyOnPositionRequest) =>
              positionApplyService.applyOnPosition(request),
            ),
          ),
        ),

        changeApplicationStatus: rxMethod<ChangePositionApplyStatusRequest>(
          pipe(
            distinctUntilChanged(),
            switchMap((request) =>
              positionApplyService.changePositionApplyStatus(request),
            ),
          ),
        ),

        loadSelectedPosition: rxMethod<number | null>(
          pipe(
            switchMap((request) =>
              positionService
                .loadSelectedPosition(request ?? 0)
                .pipe(
                  tap((response) =>
                    patchState(store, () => ({ selectedPosition: response })),
                  ),
                ),
            ),
          ),
        ),

        loadPositions: rxMethod<PositionSearchRequest>(
          pipe(
            distinctUntilChanged(),
            switchMap((request) =>
              positionService
                .loadPositions(request)
                .pipe(
                  tap((response) =>
                    patchState(store, () => ({ positions: response })),
                  ),
                ),
            ),
          ),
        ),

        removePosition: rxMethod<number>(
          pipe(
            distinctUntilChanged(),
            mergeMap((request) => positionService.removePosition(request)),
          ),
        ),

        createPosition: rxMethod<CreatePositionRequest>(
          pipe(
            distinctUntilChanged(),
            switchMap((request) => positionService.createPosition(request)),
          ),
        ),

        loadMyApplications: rxMethod<void>(
          pipe(
            switchMap(() =>
              positionApplyService
                .loadMyApplications()
                .pipe(
                  tap((applications) =>
                    patchState(store, () => ({ myApplications: applications })),
                  ),
                ),
            ),
          ),
        ),
      }),
    ),
  );
}
