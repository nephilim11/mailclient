import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

constructor() { }
subject = new BehaviorSubject('')
blob = new BehaviorSubject('')

}
