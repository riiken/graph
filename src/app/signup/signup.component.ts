import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  userEmail: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  register(data: any) {
    this.userEmail = data.email;
    let obj = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    this.http
      .post('https://qa-apis.icreditspace.com/apis/users/v1/register/', obj)
      .subscribe((res) => {
        console.log(res);
        this.navigateToGraphPage(res);
      });
  }

  navigateToGraphPage(val: any) {
    // naviagte to graph page
    if (val.message == 'User created successfully!') {
      this.userService.userEmail = this.userEmail;
      this.authService.isAuthenticated = true; // used as temporary authentication method for routes
      this.router.navigate(['/graph']);
    } else {
      alert('Please register again');
    }
  }
}
