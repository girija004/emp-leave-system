import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class Authservice {

  private httpinstance = inject(HttpClient);
  private jwt = inject(JwtHelperService);


  private url = 'https://localhost:7242/api/auth';


  loginuser(user: { email: string; password: string }) {
    return this.httpinstance.post(
      this.url + '/login',
      user,
      { responseType: 'text'}
    );
  }

  getuserinfo() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decoded: any = this.jwt.decodeToken(token);

    return {
      email: decoded.email,
      role: decoded.role,
      id: decoded.id
    };
  }


}
