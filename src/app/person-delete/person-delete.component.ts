import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService, Person } from '../services/person.service';

@Component({
  selector: 'app-person-delete',
  templateUrl: './person-delete.component.html'
})
export class PersonDeleteComponent implements OnInit {
  person: Person | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.personService.getPerson(id).subscribe(data => this.person = data);
    }
  }

  confirmDelete() {
    if (this.person) {
      this.personService.deletePerson(this.person._id!).subscribe(() => {
        alert('Person deleted!');
        this.router.navigate(['/people']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/people']);
  }
}
