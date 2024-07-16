import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  notesForm!: FormGroup;
  selectedMonth: string;

  januaryNotes: any[] = [];
  februaryNotes: any[] = [];
  marchNotes: any[] = [];

  constructor(public fb: FormBuilder, public router: Router) {
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', { month: 'long' });
    this.loadNotes();
  }

  ngOnInit(): void {
    this.notesForm = this.fb.group({
      month: ['', Validators.required],
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Created_Date: ['', Validators.required]
    });
  }

  onChange(event: any) {
    this.selectedMonth = event.target.value;
  }

  getNotesForMonth(month: string): any[] {
    switch (month) {
      case 'January':
        return this.januaryNotes;
      case 'February':
        return this.februaryNotes;
      case 'March':
        return this.marchNotes;
      default:
        return [];
    }
  }

  getAllNotes(): any[] {
    return [...this.januaryNotes, ...this.februaryNotes, ...this.marchNotes];
  }

  onSubmit() {
    if (this.notesForm.invalid) {
      return;
    }

    const newNote = this.notesForm.value;
    switch (this.selectedMonth) {
      case 'January':
        this.januaryNotes.push(newNote);
        break;
      case 'February':
        this.februaryNotes.push(newNote);
        break;
      case 'March':
        this.marchNotes.push(newNote);
        break;
      default:
        break;
    }
    this.notesForm.reset();
    this.notesForm.patchValue({ month: '' });
  }

  saveForm() {
    const notes = {
      January: this.januaryNotes,
      February: this.februaryNotes,
      March: this.marchNotes
    };
    localStorage.setItem('notes', JSON.stringify(notes));
    console.log('form saved');
  }

  loadNotes() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      const notes = JSON.parse(savedNotes);
      this.januaryNotes = notes.January || [];
      this.februaryNotes = notes.February || [];
      this.marchNotes = notes.March || [];
    }
  }

  onBack() {
    this.router.navigate(['/task_manager/dashboard']);
  }
}
