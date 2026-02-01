import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LeaveCalenderservice } from './leave-calenderservice';

@Component({
  selector: 'app-emp-leave-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './emp-leavecalendar.html',
  styleUrls: ['./emp-leavecalendar.css']
})
export class EmpLeaveCalendar implements OnInit {

  private service = inject(LeaveCalenderservice);

  leaves: {
    date: Date;
    type: string;
    status: string;
  }[] = [];

  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;

  ngOnInit() {
    this.service.getLeaveCalendar().subscribe({
      next: res => {
        this.leaves = (res ?? []).map((l: any) => ({
          date: new Date(l.date),
          type: l.type,
          status: l.status
        }));

       
        setTimeout(() => {
          if (this.calendar) {
            this.calendar.updateTodaysDate();    
          }
        });
      },
      error: err => {
        console.error('Failed to load calendar', err);
        this.leaves = [];
      }
    });
  }

  dateClass = (date: Date): string => {
    const match = this.leaves.find(l =>
      l.date.toDateString() === date.toDateString()
    );

    if (!match) return '';

    if (match.status === 'REJECTED') return 'leave-rejected';
 

    return 'leave-approved';
  };
}
