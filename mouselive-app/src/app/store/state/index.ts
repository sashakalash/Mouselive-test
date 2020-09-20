import { EntityState } from '@ngrx/entity';
import { Card } from '../../models/Card';

export interface AppState {
  cardListState: CardState;
}

export interface CardState extends EntityState<Card> {
  loaded: boolean;
}
