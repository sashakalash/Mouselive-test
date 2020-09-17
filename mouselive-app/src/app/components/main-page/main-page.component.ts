import { CardListTypes } from './../../redux/cards.actions';
import { IAppState } from './../../redux/app.state';
import { Card } from './../../models/Card';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit {
  cards$: Observable<Card[]> = this.store.select(state => state.cardList.cards);

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    // this.store.dispatch({ type: CardListTypes.FETCH_CARD_LIST });
  }

}
