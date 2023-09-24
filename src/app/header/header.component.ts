import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    public userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  handleLogout() {
    this.authService.isAuthenticated = false; // used as temporary authentication method for routes
    this.router.navigate(['/signin']);
  }
}
