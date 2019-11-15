import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { UserProfile } from '../../models/user-profile';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems = [
    { path: '/home', label: 'Home' },
    { path: '/books', label: 'Books' },
    { path: '/magazines', label: 'Magazines' },
    { path: '/textbooks', label: 'Textbooks' },
    { path: '/audiobooks', label: 'Audiobooks' },
    { path: '/recommended', label: 'Recommended' },
  ];

  userProfile$: Observable<UserProfile>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userProfile$ = this.authService.getCurrentUserProfile();
  }

}
