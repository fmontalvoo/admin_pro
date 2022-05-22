import { Component, OnInit } from '@angular/core';

import { Observable, interval } from 'rxjs';
import { retry, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() { }

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

    this.returnInterval()
      .pipe(
        retry(2)
      )
      .subscribe({
        next: console.log,
        error: error => console.error(error),
        complete: () => console.info('Completado'),
      });
  }

  private returnInterval(): Observable<number> {
    const obsersable = interval(1000)
      .pipe(
        take(20),
        map(value => value + 1)
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
