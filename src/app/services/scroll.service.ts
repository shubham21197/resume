import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  @Output() public scrollToPage: EventEmitter<string> = new EventEmitter();

  constructor() { }
}
