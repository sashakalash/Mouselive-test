import { Card } from './../../models/Card';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
import { isEmpty } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/redux/app.state';
import { CardListTypes } from 'src/app/redux/cards.actions';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.less']
})
export class AddEventComponent implements OnInit {
  form: FormGroup;
  card: BehaviorSubject<Card> = new BehaviorSubject(new Card());

  constructor(private formBuilder: FormBuilder, private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      address: [null, Validators.required],
      date: [null, [Validators.required, this.dateValidator()]]
    });
    this.form.valueChanges.subscribe(chg => this.card.next(chg));
  }

  saveCard(): void {
    const card = this.form.value;
    this.store.dispatch({ type: CardListTypes.ADD_NEW_CARD, payload: { card }});
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
