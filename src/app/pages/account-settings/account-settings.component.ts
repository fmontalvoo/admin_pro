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

  constructor() {
    this.ref = document.querySelector('#theme');
  }

  ngOnInit(): void {
  }

  public changeColorTheme(theme: string) {
    const stylePath = `./assets/css/colors/${theme}.css`;
    this.ref?.setAttribute('href', stylePath);
    localStorage.setItem('theme', stylePath);
  }

}
