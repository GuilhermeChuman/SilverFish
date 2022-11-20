import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';

import { HomeComponent } from './home.component';
import { JWTService } from 'src/app/auth/jwt.service';
import { ListasService } from 'src/app/services/listas.service';
import { CommonModule } from '@angular/common';
import { LivrosService } from '../manageBooks/listLivros/livros.service';

@NgModule({
    declarations: [
      HomeComponent,
    ],
    imports: [
      HomeRoutingModule,

      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      MatInputModule,
      MatSidenavModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatCardModule,
      MatFormFieldModule,
      FlexLayoutModule,
      MatSnackBarModule,
      MatDividerModule,
      MatProgressSpinnerModule,
      MatTooltipModule,
      MatChipsModule
    ],
    providers: [JWTService, ListasService, LivrosService],
    bootstrap: []
  })
  export class HomeModule { }
  
