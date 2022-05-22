import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let i = -1;
    const obsersable = new Observable(observer => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 22) {
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

    // obsersable.subscribe(
    //   value => console.log(value),
    //   error => console.error(error),
    //   () => console.info('Completado')
    // );

    obsersable
      .pipe(
        retry(2)
      )
      .subscribe({
        next: value => console.log(value),
        error: error => console.error(error),
        complete: () => console.info('Completado'),
      });
  }

}
