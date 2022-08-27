import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from './auth/auth.service';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { RecoverPasswordComponent } from './auth/recoverPassword/recoverPassword.component';
import { MasterPageComponent } from './pages/master-pagecomponent';

import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  //AUTH
  { 
    path: 'auth/login', 
    component: LoginComponent 
  },
  { 
    path: 'auth/signup', 
    component: SignupComponent 
  },
  { 
    path: 'auth/recoverPassword', 
    component: RecoverPasswordComponent 
  },
  
  //PAGES
  { 
    path: 'pages/home', 
    component: MasterPageComponent 
  },

  //STANDARD
  { 
    path: '**', 
    redirectTo: 'auth/login'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    RecoverPasswordComponent,
    MasterPageComponent
  ],
  imports: [
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,

    BrowserModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatSnackBarModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
