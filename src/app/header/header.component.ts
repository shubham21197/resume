import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { ScrollerComponent } from '../scroller/scroller.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @ViewChild('scroller') private scroller!: ScrollerComponent;
  @HostBinding('class') className = '';

  mobile = false;
  isExpanded = true;
  scrollPosition = 0;
  lightMode = true;

  routes = [
    { path: 'home', icon: 'home', title: 'Home' },
    { path: 'skills', icon: 'info', title: 'Skills' },
  ]

  constructor() {
    this.mobile = window.innerWidth < 768;
    this.isExpanded = !this.mobile;
  }

  ngOnInit(): void {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.toggleMode();
    }
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  scrollTo(page: string) {
    this.scroller.scrollToPage(page)
  }

  setScrollPosition(position: number) {
    this.scrollPosition = position;
  }

  toggleMode() {
    this.lightMode = !this.lightMode;
    this.className = this.lightMode ? '' : 'darkMode';
  }


}
