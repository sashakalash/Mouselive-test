import { CardService } from './../services/card.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { CardListTypes } from './cards.actions';

@Injectable({
  providedIn: 'root'
})

export class CardEffects {

  loadCards$ = createEffect(() => this.actions$.pipe(
    ofType(CardListTypes.FETCH_CARD_LIST),
    mergeMap(() => this.cardService.getCards()
      .pipe(
        map(cards => ({ type: CardListTypes.FETCH_CARD_LIST_SUCCESS, payload: { cards }})),
        catchError(() => EMPTY)
      ))
  )
  );

  constructor(
    private actions$: Actions,
    private cardService: CardService
  ) { }
}
