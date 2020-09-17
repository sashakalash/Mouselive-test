
import { Action } from '@ngrx/store';
import { Card } from '../models/Card';

export enum CardListTypes {
  FETCH_CARD_LIST = '[MAIN CARD LIST] Fetching card list',
  FETCH_CARD_LIST_SUCCESS = '[MAIN CARD LIST] Card list successfully fetched',
  ADD_NEW_CARD = '[MAIN CARD LIST] Adding new card'
}


export class FetchingList implements Action {
  readonly type = CardListTypes.FETCH_CARD_LIST;
}

export class FetchingListSuccess implements Action {
  readonly type = CardListTypes.FETCH_CARD_LIST_SUCCESS;

  constructor(public payload: { cards: Card[] }) { }
}

export class AddCard implements Action {
  readonly type = CardListTypes.ADD_NEW_CARD;

  constructor(public payload: { card: Card }) { }
}


export type ActionsUnion = FetchingList | FetchingListSuccess | AddCard;
