import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LeaveApplyservice {

  private http = inject(HttpClient);

  
  private baseUrl = 'https://localhost:7242/api/employee';


  applyLeave(data: {
    leaveType: string;
    fromDate: string;
    toDate: string;
    reason: string;
  }) {
    return this.http.post(
      `${this.baseUrl}/apply`,
      data,
      { responseType: 'text' }
    );
  }
   getMyLeaves() {
    return this.http.get<any[]>(`${this.baseUrl}/my-leaves`);
  }
}
