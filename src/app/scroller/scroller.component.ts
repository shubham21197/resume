import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.scss']
})
export class ScrollerComponent implements AfterViewInit {
  @ViewChild('home', { read: ElementRef, static: false }) private home!: ElementRef;
  @ViewChild('skills', { read: ElementRef, static: false }) private skills!: ElementRef;

  @Input() currentPage = 0;
  @Output('setPage') setPage = new EventEmitter<number>();

  midPoints = [0, 0];
  loading = false;

  constructor() { }

  ngAfterViewInit(): void {
    this.midPoints[0] = this.home.nativeElement.getBoundingClientRect().top + (this.home.nativeElement.scrollHeight / 2);
    this.midPoints[1] = this.skills.nativeElement.getBoundingClientRect().top + (this.skills.nativeElement.scrollHeight / 2);
  }

  scrollToPage(page: string) {
    this.loading = true;
    switch (page) {
      case 'home':
        this.home.nativeElement.scrollIntoView({ behavior: 'smooth' });
        this.setPage.emit(0);
        break;
      case 'skills':
        this.skills.nativeElement.scrollIntoView({ behavior: 'smooth' });
        this.setPage.emit(1);
        break;
      default:
        break;
    }
    setTimeout(() => {
      this.loading = false;
    }, 300);
  }

  @HostListener('window:scroll')
  onScroll() {
    const scrollTop = window.scrollY;
    const nearestPage = this.midPoints.reduce((prev, curr) => {
      return (Math.abs(curr - scrollTop) < Math.abs(prev - scrollTop) ? curr : prev);
    });
    const index = this.midPoints.indexOf(nearestPage);
    if (index === this.currentPage || this.loading) {
      return;
    }
    this.setPage.emit(index);
  }

}
