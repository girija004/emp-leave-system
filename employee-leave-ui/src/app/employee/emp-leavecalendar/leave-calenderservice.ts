import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeaveCalenderservice {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7242/api/employee';

  getLeaveCalendar() {
    return this.http.get<any[]>(`${this.baseUrl}/calendar`);
  }
}
