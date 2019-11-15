import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../models/user-profile';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  userProfile$: Observable<UserProfile>;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userProfile$ = this.authService.getCurrentUserProfile();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
