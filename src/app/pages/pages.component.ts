import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  private ref: Element | null;
  constructor() {
    this.ref = document.querySelector('#theme');
  }

  ngOnInit(): void {
    const stylePath = localStorage.getItem('theme') || './assets/css/colors/default.css';
    this.ref?.setAttribute('href', stylePath);
  }

}
