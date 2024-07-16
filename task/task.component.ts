import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  taskForm!: FormGroup;
  selectedMonth: string;
  
  januaryTasks: any[] = [
    { Title: 'Attend Meeting', Description: 'Attend the project meeting', Due_Date: '2024-01-15', Priority_Level: 'High', Status: 'to-do' },
    { Title: 'Make PPT', Description: 'Prepare the presentation', Due_Date: '2024-01-20', Priority_Level: 'Medium', Status: 'to-do' }
  ];
  februaryTasks: any[] = [
    { Title: 'Plan Trip', Description: 'Plan the upcoming trip', Due_Date: '2024-02-10', Priority_Level: 'Medium', Status: 'to-do' },
    { Title: 'Manage Expenses', Description: 'Update the expense report', Due_Date: '2024-02-15', Priority_Level: 'Low', Status: 'to-do' }
  ];
  marchTasks: any[] = [
    { Title: 'Visit Temple', Description: 'Go to the temple', Due_Date: '2024-03-05', Priority_Level: 'Low', Status: 'to-do' }
  ];
  
  allTasks: any[] = [...this.januaryTasks, ...this.februaryTasks, ...this.marchTasks];

  constructor(public fb: FormBuilder, public router: Router) {
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', { month: 'long' });
  }
  
  ngOnInit(): void {
    this.taskForm = this.fb.group({
      month: ['', Validators.required],
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Due_Date: ['', Validators.required],
      Priority_Level: ['', Validators.required],
      Status: ['to-do', Validators.required]
    });
  }
  
  onChange(event: any) {
    this.selectedMonth = event.target.value;
  }
  
  addTask() {
    const newTask = this.taskForm.value;
    this.allTasks.push(newTask);
    this.getTasksForMonth(this.selectedMonth).push(newTask);
    this.taskForm.reset();
    this.taskForm.patchValue({ Status: 'to-do' });
  }

  sortTasks(criteria: string) {
    this.allTasks.sort((a, b) => a[criteria].localeCompare(b[criteria]));
  }

  getTasksForMonth(month: string): any[] {
    switch (month) {
      case 'January':
        return this.januaryTasks;
      case 'February':
        return this.februaryTasks;
      case 'March':
        return this.marchTasks;
      default:
        return [];
    }
  }

  getAllTasks(): any[] {
    return this.allTasks;
  }

  editTask(task: any) {
    const index = this.allTasks.indexOf(task);
    if (index > -1) {
      this.taskForm.setValue({
        month: this.selectedMonth,
        Title: task.Title,
        Description: task.Description,
        Due_Date: task.Due_Date,
        Priority_Level: task.Priority_Level,
        Status: task.Status
      });
      this.allTasks.splice(index, 1);
      this.getTasksForMonth(this.selectedMonth).splice(index, 1);
    }
  }

  deleteTask(task: any) {
    const index = this.allTasks.indexOf(task);
    if (index > -1) {
      this.allTasks.splice(index, 1);
      this.getTasksForMonth(this.selectedMonth).splice(index, 1);
    }
  }

  saveTasks() {
    console.log('Tasks saved:', this.allTasks);
  }

  onBack() {
    this.router.navigate(['/task_manager/dashboard']);
  }
}
