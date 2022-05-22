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
    this.getUsers()
    .then(users => console.log(users));
    // console.log('Inicio del proceso');
    // const canresolve = true;
    // const promise = new Promise((resolve, reject) => {
    //   if (canresolve) resolve('Data');
    //   else reject('Error');
    // });
    // promise.then((data) => {
    //   console.info(data);
    // }
    // ).catch((error) => {
    //   console.error(error);
    // });
    // console.log('Fin del proceso');
  }

  private getUsers(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users')
        .then(response => response.json())
        .then(data => resolve(data.data));
    });

    return promise;
  }

}
