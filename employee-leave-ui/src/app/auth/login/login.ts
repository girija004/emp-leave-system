import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Authservice } from '../authservice';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private Authservice:Authservice
   
  ) {}

  login() {
    this.Authservice.loginuser({
      email: this.email,
      password: this.password
    }).subscribe((token) => {

      // ✅ SAVE TOKEN
      localStorage.setItem('token', token);

      

      // ✅ GET ROLE FROM JWT
      const user = this.Authservice.getuserinfo();

      if (user?.role === 'EMPLOYEE') {
        this.router.navigate(['/employee']);
      } else {
        this.router.navigate(['/manager']);
      }
    });
  }
}
