import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateLoginComponent } from './activateLogin.component';

const routes: Routes = [
  { path: '', component: ActivateLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivateLoginRoutingModule { }
