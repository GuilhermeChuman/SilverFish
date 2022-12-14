import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../auth/authGuard.service';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { HeaderSideComponent } from './header-side-layout/header-side.component';
import { RoleGuardService } from '../auth/roleGuard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HeaderSideComponent,
    canActivate: [RoleGuardService, AuthGuardService],
    children: [
      { 
        path: 'pages/dashboard', 
        loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      { 
        path: 'pages/loan', 
        loadChildren: () => import('../pages/loan/loan.module').then(m => m.LoanModule)
      },
      { 
        path: 'pages/manageBooks', 
        loadChildren: () => import('../pages/manageBooks/manageBooks.module').then(m => m.ManageBooksModule)
      },
      
    ]
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
        path: 'pages/books', 
        loadChildren: () => import('../pages/livros/livros.module').then(m => m.LivrosModule)
      },   
      { 
        path: 'pages/profile', 
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfileModule)
      },     
      { 
        path: 'pages/detalhes', 
        loadChildren: () => import('../pages/detalhesLivro/detalhesLivro.module').then(m => m.DetalhesLivroModule)
      },    
      { 
        path: 'pages/searchBooks', 
        loadChildren: () => import('../pages/pesquisaLivro/pesquisaLivro.module').then(m => m.PesquisaLivroModule)
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
      { 
        path: 'auth/activateLogin', 
        loadChildren: () => import('../auth/activateLogin/activateLogin.module').then(m => m.ActivateLoginModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'pages/home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }