import { CardListActions } from '../actions';
import { Card } from '../../models/Card';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, createSelector } from '@ngrx/store';
import { AppState, CardState } from '../state';

export const cardAdapter: EntityAdapter<Card> = createEntityAdapter<Card>();

const defaultCardState: CardState = {
  ids: [],
  entities: {},
  loaded: false
};

export const initialState = cardAdapter.getInitialState(defaultCardState);

export const cardReducer = createReducer(
  initialState,
  on(CardListActions.fetchingCardListSuccess, (state, { payload }) => cardAdapter.addAll(payload, { ...state, loaded: true })),
  on(CardListActions.addCard, (state, { payload }) => cardAdapter.addOne(Object.assign({ id: new Date().getTime() }, payload), state)),
  on(CardListActions.setStoredCardList, state => state),
);

const selectCardListState = (state: AppState) => state.cardListState;

export const selectCardList = createSelector(
  selectCardListState,
  state => Object.values(state.entities)
);

export const selectCardListLoaded = createSelector(
  selectCardListState,
  state => state.loaded
);

export const {
  selectAll
} = cardAdapter.getSelectors();
