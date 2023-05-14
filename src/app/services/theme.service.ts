import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  _lightMode = true;

  get lightMode() {
    return this._lightMode;
  }

  set lightMode(value: boolean) {
    localStorage.setItem('lightMode', value.toString());
    this._lightMode = value;
  } 


  constructor() {
    const prefersLight = !window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!localStorage.getItem('lightMode')) {
      localStorage.setItem('lightMode', prefersLight.toString());
    }
    this._lightMode = localStorage.getItem('lightMode') === 'true';
  }
}
