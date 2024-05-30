import {Inject, Injectable, Signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_API_URL} from "../../core/constants/injection.tokens";
import {Observable, Subject, switchMap, tap} from "rxjs";
import {IProfile} from "../../heroes/interfaces/profile.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState$: Subject<{ isAuthenticated: boolean }> = new Subject();

  constructor(@Inject(BASE_API_URL) private readonly baseUrl: string,
              private readonly http: HttpClient) {
  }

  getUserInfo() {
    return JSON.parse(window.localStorage.getItem('userInfo')!);
  }

  getUserToken() {
    return window.localStorage.getItem('token')!;
  }

  isAuthenticated(): boolean {
    if (this.getUserToken()) {
      return true;
    }
    return false;
  }

  logout() {
    this.authState$.next({isAuthenticated: false});
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userInfo');
  }

  login(loginInfo: { username: string, password: string }): Observable<any> {
    return this.http.get(`${this.baseUrl}/users?_embed=role&auth=${loginInfo.username}:${loginInfo.password}`).pipe(tap((res: any) => {
      if (res?.length) {
        const userInfo = res[0];
        delete userInfo.password;
        window.localStorage.setItem('token', userInfo.username); // as i don't have a token i will use username
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
        this.authState$.next({isAuthenticated: true});
      } else {
        throw new Error('Invalid username or password');
      }

    }));
  }

  register(payload: { profile: IProfile, userAccount: any }): any {
    payload.userAccount.roleId = "2";
    payload.userAccount.auth = `${payload.userAccount.username}:${payload.userAccount.password}`;
    return this.addUserAccount(payload.userAccount).pipe(
      switchMap((user) => {
        payload.profile.userId = user.id;
        payload.profile.avatar = "https://via.placeholder.com/150";
        return this.addProfile(payload.profile);
      }));
  }

  addProfile(profile: IProfile): Observable<IProfile> {
    return this.http.post<IProfile>(`${this.baseUrl}/profiles`, profile);
  }

  addUserAccount(userAccount: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, userAccount);
  }
}
