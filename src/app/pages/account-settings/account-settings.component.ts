import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
    '#themecolors .selector {cursor:pointer;}'
  ]
})
export class AccountSettingsComponent implements OnInit {
  private ref: Element | null;
  private links!: NodeListOf<Element> | null;

  constructor() {
    this.ref = document.querySelector('#theme');
  }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  public changeColorTheme(theme: string): void {
    const stylePath = `./assets/css/colors/${theme}.css`;
    this.ref?.setAttribute('href', stylePath);
    localStorage.setItem('theme', stylePath);
    this.checkCurrentTheme();
  }

  public checkCurrentTheme() {
    this.links?.forEach(link => {
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
