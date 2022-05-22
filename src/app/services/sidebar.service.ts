import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      items: [
        {
          title: 'Main',
          url: '/',
        },
        {
          title: 'Graph One',
          url: 'graph-one',
        },
        {
          title: 'Progress Bar',
          url: 'progress',
        },
        {
          title: 'Promises',
          url: 'promises',
        },
      ]
    }
  ];
  constructor() { }
}
