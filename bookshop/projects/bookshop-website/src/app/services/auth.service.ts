import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Credentials } from '../models/credentials';
import { LoginResponse } from '../models/login-response';
import { UserProfile } from '../models/user-profile';

const URL = 'https://immense-forest-87642.herokuapp.com/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserProfileSubject: BehaviorSubject<UserProfile>;
  currentUserProfile: Observable<UserProfile>;

  constructor(private http: HttpClient) {
    this.currentUserProfileSubject = new BehaviorSubject(null);
    this.currentUserProfile = this.currentUserProfileSubject.asObservable();
  }

  getCurrentUserProfile(): Observable<UserProfile> {
    return this.currentUserProfile;
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(URL, user);
  }

  login(credentials: Credentials): Observable<UserProfile> {
    return this.http.post<LoginResponse>(`${URL}/login`, credentials)
      .pipe(switchMap((res: LoginResponse) => {
        localStorage.setItem('TOKEN', res.token);
        return this.getUserProfile();
      }));
  }

  logout() {
    localStorage.removeItem('TOKEN');
    this.currentUserProfileSubject.next(null);
  }

  getToken() {
    return localStorage.getItem('TOKEN');
  }

  getUserProfile(): Observable<UserProfile> {
    const userProfile$ = this.http.get<UserProfile>(`${URL}/me`);
    userProfile$.subscribe((userProfile: UserProfile) => {
      this.currentUserProfileSubject.next(userProfile);
    });
    return userProfile$;
  }

  initUserProfile() {
    const token = this.getToken();
    if (token) {
      const userProfile$ = this.getUserProfile();
      return userProfile$.toPromise();
    }
  }
}
