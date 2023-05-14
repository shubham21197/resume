import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { ScrollerComponent } from '../scroller/scroller.component';
import { ThemeService } from '../services/theme.service';

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

  get lightMode() {
    return this.themeService.lightMode;
  }

  routes = [
    { path: 'home', icon: 'home', title: 'Home' },
    { path: 'skills', icon: 'info', title: 'Skills' },
  ]

  constructor(private themeService: ThemeService) {
    this.mobile = window.innerWidth < 768;
    this.isExpanded = !this.mobile;
  }

  ngOnInit(): void {
    this.className = this.themeService.lightMode ? '' : 'darkMode';
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth < 768) {
      if (this.isExpanded) {
        this.toggle();
      }
      this.mobile = true;
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
    this.themeService.lightMode = !this.themeService.lightMode;
    this.className = this.themeService.lightMode ? '' : 'darkMode';
  }


}
