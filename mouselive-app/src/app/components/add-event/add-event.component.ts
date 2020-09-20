import { Card } from './../../models/Card';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/state';
import { CardListActions } from 'src/app/store';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.less']
})
export class AddEventComponent implements OnInit {
  form: FormGroup;
  card: BehaviorSubject<Card> = new BehaviorSubject(new Card());

  constructor(private formBuilder: FormBuilder, private store$: Store<AppState>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      address: [null, Validators.required],
      date: [null, [Validators.required, this.dateValidator()]]
    });
    this.form.valueChanges.subscribe(chg => this.card.next(chg));
  }

  saveCard(): void {
    this.store$.dispatch(CardListActions.addCard({ payload: Object.assign({ id: new Date().getTime() }, this.form.value )}));
    this.form.reset();
  }

  private dateValidator = (): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value = new Date(control.value).getTime();
      if (control.value && value === 0) {
        return { incorrect: true };
      }
    };
  }

}
