import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PesquisaLivroComponent } from './pesquisaLivro.component';

const routes: Routes = [
  { path: '', component: PesquisaLivroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PesquisaLivroRoutingModule { }