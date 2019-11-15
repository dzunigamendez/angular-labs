import { Component, OnInit } from '@angular/core';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { UserProfile } from '../../models/user-profile';

@Component({
  selector: 'app-util-nav',
  templateUrl: './util-nav.component.html',
  styleUrls: ['./util-nav.component.scss']
})
export class UtilNavComponent implements OnInit {
  isLoggedIn: boolean = false;
  userProfile: UserProfile;
  faShoppingCart = faShoppingCart;
  faUser = faUser;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCurrentUserProfile().subscribe(userProfile => {
      this.isLoggedIn = userProfile !== null;
      this.userProfile = userProfile;
    });
  }
}
