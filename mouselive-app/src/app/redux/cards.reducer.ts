import * as CardActions from './cards.actions';
import { Card } from '../models/Card';

export interface State {
  cards: Card[];
}

export const initialState: State = {
  cards: []
};

export function cardReducer(
  state = initialState,
  action: CardActions.ActionsUnion
): State {
  switch (action.type) {
    case CardActions.CardListTypes.FETCH_CARD_LIST_SUCCESS: {
      return {
        ...state,
        cards: action.payload.cards
      };
    }

    case CardActions.CardListTypes.ADD_NEW_CARD: {
      return {
        ...state,
        cards: [
          ...state.cards,
          action.payload.card
        ],
      };
    }

    default: {
      return state;
    }
  }
}
