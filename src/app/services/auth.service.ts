import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = `${environment.url}/auth`;

  constructor(private http: HttpClient, private auth: AngularFireAuth) { }

  public login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/login`, { email, password })
      .pipe(
        tap((response: any) =>
          localStorage.setItem('accessToken', response['token'])
        )
      );
  }

  public async signinWithGoogle() {
    const result = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const obj = JSON.parse(JSON.stringify(result.credential));
    const idToken = obj['idToken'];
    return this.loginWithGoogleJWT(idToken);
  }

  private loginWithGoogleJWT(token: string): Observable<any> {
    return this.http.post(`${this.url}/login/google`, { token })
      .pipe(
        tap((response: any) => {
          this.auth.signOut();
          localStorage.setItem('accessToken', response['token']);
        }
        )
      );
  }

}
