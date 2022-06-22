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
          url: '/dashboard',
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
        {
          title: 'Rxjs',
          url: 'rxjs',
        },
      ]
    },
    {
      title: 'Mantenimeintos',
      icon: 'mdi mdi-folder-lock-open',
      items: [
        {
          title: 'Usuarios',
          url: 'users',
        },
        {
          title: 'Doctores',
          url: 'doctors',
        },
        {
          title: 'Hospitales',
          url: 'hospitals',
        },
      ]
    }
  ];
  constructor() { }
}
