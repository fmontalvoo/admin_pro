import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('Inicio del proceso');
    const canresolve = true;
    const promise = new Promise((resolve, reject) => {
      if (canresolve) resolve('Data');
      else reject('Error');
    });

    promise.then((data) => {
      console.info(data);
    }
    ).catch((error) => {
      console.error(error);
    });

    console.log('Fin del proceso');
  }

}
