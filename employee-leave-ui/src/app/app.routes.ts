import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { EmpDashboard } from './employee/emp-dashboard/emp-dashboard';
import { ManagerDashboard } from './manager/manager-dashboard/manager-dashboard';
import { EmpLeaveapply } from './employee/emp-leaveapply/emp-leaveapply';

export const routes: Routes = [
    {path:'',component:Login},
    {path:'employee',component:EmpDashboard},
      {path:'manager',component:ManagerDashboard},
        { path: 'employee/leave', component: EmpLeaveapply },
];
