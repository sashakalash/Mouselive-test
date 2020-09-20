import { CardService } from '../../services/card.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { CardListActions } from '../actions';

@Injectable()

export class CardsEffects {

  constructor(
    private actions$: Actions,
    private cardService: CardService
  ) { }

  loadCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardListActions.fetchingCardList),
      switchMap(() => this.cardService.getCards().pipe(
        map(cards => CardListActions.fetchingCardListSuccess({ payload: cards })),
        catchError(err => of(CardListActions.fetchingCardListFail({ payload: err })))
      )
      )
    )
  );
}
