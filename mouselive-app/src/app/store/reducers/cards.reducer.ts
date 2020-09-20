import { CardListActions } from '../actions';
import { Card } from '../../models/Card';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, createSelector } from '@ngrx/store';
import { AppState, CardState } from '../state';

export const cardAdapter: EntityAdapter<Card> = createEntityAdapter<Card>();

const defaultCardState: CardState = {
  ids: [],
  entities: {}
};

export const initialState = cardAdapter.getInitialState(defaultCardState);

export const cardReducer = createReducer(
  initialState,
  on(CardListActions.fetchingCardListSuccess, (state, { payload }) => cardAdapter.addAll(payload, state)),
  on(CardListActions.addCard, (state, { payload }) => cardAdapter.addOne(payload, state))
);

const selectCardListState = (state: AppState) => state.cardListState;

export const selectCardList = createSelector(
  selectCardListState,
  state => Object.values(state.entities)
);

export const {
  selectAll
} = cardAdapter.getSelectors();
