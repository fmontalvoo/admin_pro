import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';

import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';

import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule,
    provideFirebaseApp(() => initializeApp(environment.firebase))
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
