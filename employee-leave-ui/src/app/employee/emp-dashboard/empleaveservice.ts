import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface LeaveBalanceApi {
  type: string;
  remaining: number;
  total: number;
}
@Injectable({
  providedIn: 'root',
})

export class Empleaveservice {
   private baseUrl = 'https://localhost:7242/api/employee';

  constructor(private http: HttpClient) {}

  getLeaveBalances(): Observable<LeaveBalanceApi[]> {
    return this.http.get<LeaveBalanceApi[]>(
      `${this.baseUrl}/leave-balances`
    );
  }
}
