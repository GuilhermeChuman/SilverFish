import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../auth/authGuard.service';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { HeaderSideComponent } from './header-side-layout/header-side.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HeaderSideComponent,
    canActivate: [AuthGuardService],
    children: [
      { 
        path: 'pages/home', 
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule)
      },
      { 
        path: 'pages/profile', 
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfileModule)
      },
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { 
        path: 'auth/login', 
        loadChildren: () => import('../auth/login/login.module').then(m => m.LoginModule)
      },
      { 
        path: 'auth/signup', 
        loadChildren: () => import('../auth/signup/signup.module').then(m => m.SignupModule)
      },
      { 
        path: 'auth/recovery', 
        loadChildren: () => import('../auth/recoverPassword/recoveryPassword.module').then(m => m.RecoverPasswordModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }