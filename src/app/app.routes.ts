import { Routes } from '@angular/router';
import { PeopleListComponent } from './people-list/people-list.component';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { PersonDeleteComponent } from './person-delete/person-delete.component';

export const routes: Routes = [
  { path: 'people', component: PeopleListComponent },
  { path: 'people/edit/:id', component: PersonEditComponent },
  { path: 'people/delete/:id', component: PersonDeleteComponent },
  { path: '', redirectTo: 'people', pathMatch: 'full' }, 
];

