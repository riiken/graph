import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  [x: string]: any;
  userEmail: any;
  constructor(
    private https: HttpClient,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.userService.userEmail = null;
  }

  login(data: any) {
    // handle login request
    this.userEmail = data.email;
    let obj = {
      email: data.email,
      password: data.password,
    };
    this.https
      .post('https://qa-apis.icreditspace.com/apis/users/v1/login/', obj)
      .subscribe(
        (res) => {
          console.log(res);
          this.authService.isAuthenticated = true; // used as temporary authentication method for routes
          this.navigateToGraphPage(res);
        },

        (error) => {
          console.error(error);
          alert("User doesn't exist");
        }
      );
  }

  navigateToGraphPage(val: any) {
    // navigation to graph page
    if (val && val.message == 'Login Successful') {
      this.userService.userEmail = this.userEmail;
      this.router.navigate(['/graph']);
    }
  }
}
