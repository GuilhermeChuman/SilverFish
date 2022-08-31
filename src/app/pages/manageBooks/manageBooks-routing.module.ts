import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageBooksComponent } from './manageBooks.component';

const routes: Routes = [
  { path: '', component: ManageBooksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBooksRoutingModule { }