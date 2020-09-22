import { Card } from 'src/app/models';
import * as fromReducer from './index';
import * as fromActions from '../actions';
const { initialState } = fromReducer;

describe('CardsReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'unknown'
      };
      const state = fromReducer.cardReducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });

  describe('fetchingCardListSuccess action', () => {
    it('should update state', () => {
      const newState: Card[] = [
        {
          name: 'Event1',
          address: 'USA, NY',
          date: '2020-04-13',
          id: 1
        }
      ];
      const action = fromActions.CardListActions.fetchingCardListSuccess({ payload: newState });
      const state = Object.values(fromReducer.cardReducer(initialState, action).entities);
      expect(state).toEqual(newState);
    });
  });

  describe('addCard action', () => {
    it('should add new card to state', () => {
      const newCard: Card =
      {
        name: 'Event2',
        address: 'USA, NY',
        date: '2020-04-13',
        id: 2
      };
      const action = fromActions.CardListActions.addCard({ payload: newCard });
      const state = Object.values(fromReducer.cardReducer(initialState, action).entities);
      expect(state).toContain(newCard);
    });
  });
});

describe('CardSelectors', () => {
  it('should select all cards', () => {
    const newState = {
      entities: [
        {
          name: 'Event1',
          address: 'USA, NY',
          date: '2020-04-13',
          id: 1
        }
      ]
    };
    const result = fromReducer.selectCardList.projector(newState);
    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(1);
  });
});
