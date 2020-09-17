import { API } from '../constants/environments';
import { Card } from '../models/Card';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, catchError, shareReplay, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { EMPTY, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
}
)
export class CardService {
  private destroyed$ = new Subject();

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(API.events).pipe(
      catchError(err => {
        this.toastr.error('Server doesn`t response', 'Something`s gone wrong!');
        return EMPTY;
      }),
      shareReplay(),
      takeUntil(this.destroyed$)
    );
  }
}
