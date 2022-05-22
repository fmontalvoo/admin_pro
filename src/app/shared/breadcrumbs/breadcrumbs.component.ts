import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Data, Router } from '@angular/router';

import { filter, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public title: string = '';
  private titleSubscription!: Subscription;

  constructor(private router: Router) {
    this.titleSubscription = this.getTitle()
      .subscribe(({ title }) => {
        this.title = title;
        document.title = `AdminPro: ${title}`;
      });;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.titleSubscription.unsubscribe();
  }

  private getTitle(): Observable<Data> {
    return this.router.events
      .pipe(
        filter<any>(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data),
      );
  }

}
