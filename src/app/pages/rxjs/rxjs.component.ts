import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const obsersable = new Observable(observer => {
      let i = -1;
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 20) {
          clearInterval(interval);
          observer.complete();
        }
        if (i === 21) {
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

    obsersable.subscribe({
      next: value => console.log(value),
      error: error => console.error(error),
      complete: () => console.info('Completado'),
    });
  }

}
