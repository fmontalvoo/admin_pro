import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { PromisesComponent } from './promises/promises.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphOneComponent } from './graph-one/graph-one.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { UsersComponent } from './maintenances/users/users.component';
import { DoctorComponent } from './maintenances/doctors/doctor.component';
import { DoctorsComponent } from './maintenances/doctors/doctors.component';
import { HospitalsComponent } from './maintenances/hospitals/hospitals.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { AdminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [
  {
    path: '',
    data: { title: 'Dashboard' },
    component: DashboardComponent,
  },
  {
    path: 'account-settings',
    data: { title: 'Account settings' },
    component: AccountSettingsComponent,
  },
  {
    path: 'profile/:id',
    data: { title: 'User profile' },
    component: ProfileComponent,
  },
  {
    path: 'progress',
    data: { title: 'Progress' },
    component: ProgressComponent,
  },
  {
    path: 'graph-one',
    data: { title: 'Graph' },
    component: GraphOneComponent,
  },
  {
    path: 'promises',
    data: { title: 'Promises' },
    component: PromisesComponent,
  },
  {
    path: 'rxjs',
    data: { title: 'Rxjs' },
    component: RxjsComponent,
  },
  // Mantenimeintos
  {
    path: 'users',
    canActivate: [AdminGuard],
    data: { title: 'Mantenimiento usuarios' },
    component: UsersComponent,
  },
  {
    path: 'doctors',
    data: { title: 'Mantenimiento doctores' },
    component: DoctorsComponent,
  },
  {
    path: 'doctor/:id',
    data: { title: 'Doctor' },
    component: DoctorComponent,
  },
  {
    path: 'hospitals',
    data: { title: 'Mantenimiento Hospitales' },
    component: HospitalsComponent,
  },
  // Busquedas
  {
    path: 'search/:query',
    data: { title: 'Busquedas' },
    component: BusquedasComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(childRoutes),
  ],
})
export class ChildRoutesModule { }
