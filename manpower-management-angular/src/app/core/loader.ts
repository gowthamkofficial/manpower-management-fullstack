import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {}

  open() {
    this.isLoading.next(true);
  }

  close() {
    this.isLoading.next(false);
  }
}
