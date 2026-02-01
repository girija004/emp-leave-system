import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { EmpLeaveapply } from '../emp-leaveapply/emp-leaveapply';
import { EmpLeaveCalendar } from '../emp-leavecalendar/emp-leavecalendar';
import { Empleaveservice } from './empleaveservice';
import {Authservice} from '../../auth/authservice';

@Component({
  selector: 'app-emp-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    EmpLeaveapply,
    EmpLeaveCalendar
  ],
  templateUrl: './emp-dashboard.html',
  styleUrls: ['./emp-dashboard.css'],
})
export class EmpDashboard implements OnInit {

  currentView = signal<'balances' | 'apply' | 'leavecalender'>('balances');
  userEmail = signal<string>(''); 
  leaves = signal<{
    type: string;
    count: number;
    total: number;
    progress: number;
  }[]>([]);

  constructor(private leaveService: Empleaveservice,private authservice:Authservice) {}

  ngOnInit() {
     const user = this.authservice.getuserinfo();
  console.log('USER FROM AUTH SERVICE:', user);

     this.setUserEmail();  
    this.loadLeaveBalances();
  }
  setUserEmail() {
    const user = this.authservice.getuserinfo();
    if (user) {
      this.userEmail.set(user.email);
    }
  }
  showView(view: 'balances' | 'apply' | 'leavecalender') {
    this.currentView.set(view);
  }

  loadLeaveBalances() {
    this.leaveService.getLeaveBalances().subscribe({
      next: (data) => {
        this.leaves.set(
          data.map(l => ({
            type: l.type,
            count: l.remaining,
            total: l.total,
            progress: Math.round((l.remaining / l.total) * 100)
          }))
        );
      },
      error: err => console.error(err)
    });
  }
}
