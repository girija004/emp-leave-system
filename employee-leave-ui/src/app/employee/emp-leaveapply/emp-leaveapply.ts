import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { LeaveApplyservice } from './leave-applyservice';
import { MatCard } from "@angular/material/card";

@Component({
  selector: 'app-emp-leaveapply',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCard
],
  templateUrl: './emp-leaveapply.html',
  styleUrls: ['./emp-leaveapply.css'],
})
export class EmpLeaveapply {

  leaveTypes = ['Sick', 'Casual', 'Earned', 'Comp Off', 'Annual'];

  pendingLeaves: any[] = [];
  historyLeaves: any[] = [];
  private leaveService = inject(LeaveApplyservice);

  leaveForm = new FormGroup({
    leaveType: new FormControl<string | null>(null, Validators.required),
    fromDate: new FormControl<Date | null>(null, Validators.required),
    toDate: new FormControl<Date | null>(null, Validators.required),
    reason: new FormControl<string | null>(null, Validators.required)
  });
  ngOnInit(): void {
    this.loadLeaves();
  }
  submit() {
    if (this.leaveForm.invalid) {
      this.leaveForm.markAllAsTouched();
      return;
    }

    const payload = {
      leaveType: this.leaveForm.value.leaveType!,
       fromDate: new Date(this.leaveForm.value.fromDate!).toISOString(),
    toDate: new Date(this.leaveForm.value.toDate!).toISOString(),
      reason: this.leaveForm.value.reason!
    };

    this.leaveService.applyLeave(payload).subscribe({
      next: res => {
        console.log(res);
        this.leaveForm.reset();
      },
      error: err => console.error(err)
    });
 
  }
    loadLeaves() {
    this.leaveService.getMyLeaves().subscribe({
      next: (res: any[]) => {
        this.pendingLeaves = res.filter(l => l.status === 'Pending');
        this.historyLeaves = res.filter(
          l => l.status === 'Approved' || l.status === 'Rejected'
        );
      },
      error: err => console.error('Failed to load leaves', err)
    });
  }
}
