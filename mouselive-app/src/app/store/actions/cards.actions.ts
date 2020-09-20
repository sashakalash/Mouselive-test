import { createAction, props } from '@ngrx/store';
import { Card } from 'src/app/models';

export enum CardListTypes {
  FETCH_CARD_LIST = '[MAIN CARD LIST] Fetching card list',
  FETCH_CARD_LIST_SUCCESS = '[MAIN CARD LIST] Card list successfully fetched',
  FETCH_CARD_LIST_FAIL = '[MAIN CARD LIST] Card list fetch failed',
  ADD_NEW_CARD = '[MAIN CARD LIST] Adding new card'
}

export const fetchingCardList = createAction(
  CardListTypes.FETCH_CARD_LIST
);

export const fetchingCardListSuccess = createAction(
  CardListTypes.FETCH_CARD_LIST_SUCCESS,
  props<{ payload: Card[] }>()
);

export const fetchingCardListFail = createAction(
  CardListTypes.FETCH_CARD_LIST_FAIL,
  props<{ payload: any }>()
);

export const addCard = createAction(
  CardListTypes.ADD_NEW_CARD,
  props<{ payload: Card }>()
);

