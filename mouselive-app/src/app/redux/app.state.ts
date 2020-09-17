import { Card } from './../models/Card';

export interface IAppState {
  cardList: {
    cards: Card[];
  };
}
