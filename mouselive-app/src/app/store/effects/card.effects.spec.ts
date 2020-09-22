import { CardService } from './../../services/card.service';
import { TestBed } from '@angular/core/testing';

import { CardsEffects } from './../../store/effects/cards.effects';
import { AppState } from '../state';
import { Observable, of } from 'rxjs';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { CardListActions } from '../actions';
import { Action } from '@ngrx/store';


describe('CardsEffects', () => {
  const initialState = {
    ids: [],
    entities: {},
    loaded: false
  };
  const cardService = jasmine.createSpyObj('cardService', ['getCards']);
  let effects: CardsEffects;
  let actions$: Observable<Action>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CardsEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
        { provide: CardService, useValue: cardService }
      ]
    });
    effects = TestBed.inject(CardsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
