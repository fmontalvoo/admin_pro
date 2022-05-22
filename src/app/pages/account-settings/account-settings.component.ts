import { Component, OnInit } from '@angular/core';

import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
    '#themecolors .selector {cursor:pointer;}'
  ]
})
export class AccountSettingsComponent implements OnInit {
  private links!: NodeListOf<Element> | null;

  constructor(private ss: SettingsService) {
  }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.ss.checkCurrentTheme(this.links);
  }

  public changeColorTheme(theme: string): void {
    this.ss.changeColorTheme(theme);
    this.ss.checkCurrentTheme(this.links);
  }


}
