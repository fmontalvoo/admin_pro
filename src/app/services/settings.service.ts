import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private ref: Element | null = document.querySelector('#theme');

  constructor() {
    const stylePath = localStorage.getItem('theme') || './assets/css/colors/default.css';
    this.ref?.setAttribute('href', stylePath);
  }

  public changeColorTheme(theme: string): void {
    const stylePath = `./assets/css/colors/${theme}.css`;
    this.ref?.setAttribute('href', stylePath);
    localStorage.setItem('theme', stylePath);
  }

  public checkCurrentTheme(links?: NodeListOf<Element> | null): void {
    if (links) {
      links.forEach(link => {
        link.classList.remove('working');
        const theme = link.getAttribute('data-theme');
        const stylePath = `./assets/css/colors/${theme}.css`;
        const currentStyle = this.ref?.getAttribute('href');
        if (currentStyle === stylePath) {
          link.classList.add('working');
        }
      });
    }
  }
}
