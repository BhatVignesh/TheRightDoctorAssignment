import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService, Person } from '../services/person.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-person-edit',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './person-edit.component.html',
})
export class PersonEditComponent implements OnInit {
  person: Person = { _id: '', Name: '', Age: 0, Gender: '', MobileNumber: '' };

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private personService: PersonService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.personService.getPerson(id).subscribe(data => this.person = data);
    }
  }

  save() {
    if(this.person._id){
    this.personService.updatePerson(this.person._id, this.person).subscribe(() => {
      alert('Person updated!');
      this.router.navigate(['/people']);
    });}
    else{
      console.error('Person id is missing')
    }
  }
}
