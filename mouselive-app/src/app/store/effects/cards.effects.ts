import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../state';
import { CardService } from '../../services/card.service';
import { CardListActions } from '../actions';

@Injectable()

export class CardsEffects {

  constructor(
    private actions$: Actions,
    private cardService: CardService,
    private store$: Store<AppState>
  ) {
  }

  loadCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardListActions.fetchingCardList),
      withLatestFrom(this.store$),
      map(([action, storeState]) => [action.type, storeState.cardListState.loaded]),
      switchMap(([storeName, isLoaded]) => {
        if (isLoaded) {
          return of(CardListActions.setStoredCardList());
        } else {
          return this.cardService.getCards().pipe(
            map(cards => CardListActions.fetchingCardListSuccess({ payload: cards })),
            catchError(err => of(CardListActions.fetchingCardListFail({ payload: err })))
          );
        }
      })
    )
  );
}
