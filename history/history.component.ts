import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent {
  januaryTasks: any[] = JSON.parse(localStorage.getItem('tasks') || '{}').January || [];
  februaryTasks: any[] = JSON.parse(localStorage.getItem('tasks') || '{}').February || [];
  marchTasks: any[] = JSON.parse(localStorage.getItem('tasks') || '{}').March || [];

  getAllTasks(): any[] {
    return [...this.januaryTasks, ...this.februaryTasks, ...this.marchTasks];
  }
  constructor( public router: Router) {
    const currentDate = new Date();
    
  }
  
  onBack() {
    this.router.navigate(['/task_manager/dashboard']);
  }
}
