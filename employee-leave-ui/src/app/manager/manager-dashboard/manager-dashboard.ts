import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent
} from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Authservice } from '../../auth/authservice'; 

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatNavList,
    MatIcon,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatToolbar,
    MatCard,
    MatButtonModule
  ],
  templateUrl: './manager-dashboard.html',
  styleUrl: './manager-dashboard.css',
})
export class ManagerDashboard implements OnInit {

  private http = inject(HttpClient);
  private authService = inject(Authservice);

  
  private baseUrl = 'https://localhost:7242/api/employee';


  currentView = signal<'approve'>('approve');


  requests = signal<any[]>([]);

  ngOnInit(): void {
    this.loadPendingRequests();
  }

  showView(view: 'approve') {
    this.currentView.set(view);
  }


  loadPendingRequests() {
    this.http
      .get<any[]>(`${this.baseUrl}/manager/pending-requests`)
      .subscribe({
        next: res => this.requests.set(res),
        error: err => console.error('Failed to load requests', err)
      });
  }


  decide(id: number, decision: 'Approved' | 'Rejected') {
    this.http
      .post(
        `${this.baseUrl}/manager/decision/${id}?decision=${decision}`,
        {},
        { responseType: 'text' } 
      )
      .subscribe({
        next: () => this.loadPendingRequests(),
        error: err => console.error('Decision failed', err)
      });
  }

  userEmail() {
    return this.authService.getuserinfo()?.email ?? '';
  }
}
