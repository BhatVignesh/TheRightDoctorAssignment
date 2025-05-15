import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { PersonService, Person } from '../services/person.service';
import { Router } from '@angular/router';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule,MatSnackBarModule], 
  templateUrl: './people-list.component.html'
})
export class PeopleListComponent implements OnInit {
  people: Person[] = [];

  newPerson: Person = {
    Name: '',
    Age: 0,
    Gender: '',
    MobileNumber: ''
  };
  deleteConfirmId: string | null = null;

  constructor(private personService: PersonService, private router: Router,private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.personService.getPeople().subscribe(data => this.people = data);
  }

  editPerson(id: string) {
    this.router.navigate(['/people/edit', id]);
  }

  deletePerson(id: string) {
    this.router.navigate(['/people/delete', id]);
  }

  addPerson() {
    this.personService.addPerson(this.newPerson).subscribe({
      next: () => {
        this.snackBar.open('Person added successfully!', undefined, { duration: 3000,  panelClass: ['snackbar-dark']
        });
        this.newPerson = { Name: '', Age: 0, Gender: '', MobileNumber: '' };
        this.loadPeople();
      },
      error: (err) => {
        console.error('Error adding person:', err);
        this.snackBar.open('Failed to add person', undefined, { duration: 3000,  panelClass: ['snackbar-dark']
        });
      }
    });
  }

  showDeleteConfirm(id: string) {
    this.deleteConfirmId = id;  
  }

  cancelDelete() {
    this.deleteConfirmId = null;
  }

  confirmDelete(id: string) {
    this.personService.deletePerson(id).subscribe({
      next: () => {
        this.snackBar.open('Person deleted successfully!', undefined, { duration: 3000,  panelClass: ['snackbar-dark']
        });
        this.deleteConfirmId = null;
        this.loadPeople();
      },
      error: (err) => {
        this.snackBar.open('Failed to delete person', undefined, { duration: 3000 ,  panelClass: ['snackbar-dark']
        });
        alert('Failed to delete person');
      }
    });
  }
}
