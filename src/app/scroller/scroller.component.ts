import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.scss']
})
export class ScrollerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('home', { read: ElementRef, static: false }) private home!: ElementRef;
  @ViewChild('skills', { read: ElementRef, static: false }) private skills!: ElementRef;

  @Input() currentPage = 0;
  @Output('setPage') setPage = new EventEmitter<number>();

  midPoints = [0, 0];

  private readonly destroy$ = new Subject<boolean>();

  constructor() {
    fromEvent(window, 'scroll')
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.onScroll();
      });
  }

  ngAfterViewInit(): void {
    this.midPoints[0] = this.home.nativeElement.getBoundingClientRect().top + (this.home.nativeElement.scrollHeight / 2);
    this.midPoints[1] = this.skills.nativeElement.getBoundingClientRect().top + (this.skills.nativeElement.scrollHeight / 2);
  }

  scrollToPage(page: string) {
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
  }

  onScroll() {
    const scrollTop = window.scrollY;
    const nearestPage = this.midPoints.reduce((prev, curr) => {
      return (Math.abs(curr - scrollTop) < Math.abs(prev - scrollTop) ? curr : prev);
    });
    const index = this.midPoints.indexOf(nearestPage);
    if (index === this.currentPage) {
      return;
    }
    this.setPage.emit(index);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
