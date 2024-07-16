import { Component } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import {SideNavComponent } from '../side-nav/side-nav.component';
import {CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
selector: 'app-dashboard',
standalone: true,
imports: [MatIconModule, SideNavComponent, CommonModule],
templateUrl: './dashboard.component.html',
styleUrl:'./dashboard.component.css'
})

export class DashboardComponent {
lastMonthsTask =['January: Attend Meeting ,Make ppt', 'February: Plan trip & manage expenses', 'March: Visit temple'];
currentMonthTask = 'Attend Zoom Meet on sunday';

lastMonthsNote=['January: Pay yearly Bill', 'February: Check Accounts ', 'March: Arrange Books'];
currentMonthNote= 'Visit Temple';

constructor(public router: Router){}
onTask() {
this.router.navigate(['/task_manager/task']);
}
onNote() {
    this.router.navigate(['/task_manager/notes']);
    }
}