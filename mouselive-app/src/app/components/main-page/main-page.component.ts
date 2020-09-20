import { selectCardList } from './../../store/reducers/cards.reducer';

import { Card } from './../../models/Card';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/state';
import { CardListActions } from 'src/app/store';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit {
  cards$: Observable<Card[]>;

  constructor(private store$: Store<AppState>) {
    this.cards$ = this.store$.pipe(select(selectCardList));
  }

  ngOnInit(): void {
    this.store$.dispatch(CardListActions.fetchingCardList());
  }

}
