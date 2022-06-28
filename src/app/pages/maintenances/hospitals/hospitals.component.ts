import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  public from: number = 0;
  public total: number = 0;
  public cargando: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public buscar(query: string) {
    this.cargando = true;
  }

  public changeValue(value: number): void {
    this.from += value;
    if (this.from < 0)
      this.from = 0;
    else if (this.from > this.total)
      this.from -= value;
  }

}
