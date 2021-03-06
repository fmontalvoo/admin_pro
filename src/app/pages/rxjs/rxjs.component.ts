import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  private intervalSubscription: Subscription;

  constructor() {
    this.intervalSubscription = new Subscription();
  }

  ngOnInit(): void {
    // this.returnObservable()
    //   .pipe(retry(1))
    //   .subscribe(
    //     value => console.log(value),
    //     error => console.error(error),
    //     () => console.info('Completado')
    //   );

    // this.returnObservable()
    //   .pipe(
    //     retry(2)
    //   )
    //   .subscribe({
    //     next: value => console.log(value),
    //     error: error => console.error(error),
    //     complete: () => console.info('Completado'),
    //   });

    const sub = this.returnInterval()
      .pipe(
        retry(2)
      )
      .subscribe({
        next: console.log,
        error: error => console.error(error),
        complete: () => console.info('Completado'),
      });

    this.intervalSubscription.add(sub);
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  private returnInterval(): Observable<number> {
    const obsersable = interval(500)
      .pipe(
        take(1000),
        map(value => value + 1),
        filter(value => (value % 2 === 0) ? true : false),
      );
    return obsersable;
  }

  private returnObservable(): Observable<number> {
    let i = -1;
    const obsersable = new Observable<number>(observer => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 20) {
          clearInterval(interval);
          observer.complete();
        }
        if (i === 21) {
          i = 0;
          clearInterval(interval);
          observer.error('Error');
        }
      }, 1000);
    });
    return obsersable;
  }

}
