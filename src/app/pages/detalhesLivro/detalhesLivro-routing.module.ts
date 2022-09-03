import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalhesLivroComponent } from './detalhesLivro.component';

const routes: Routes = [
  { path: '', component: DetalhesLivroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalhesLivroRoutingModule { }