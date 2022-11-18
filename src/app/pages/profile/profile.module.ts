import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { HomeRoutingModule } from './profile-routing.module';

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

import { ProfileComponent } from './profile.component';
import { ListasService } from 'src/app/services/listas.service';
import { EditorasService } from '../manageBooks/listEditoras/editoras.service';
import { GenerosService } from '../manageBooks/listGeneros/generos.service';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
    declarations: [
      ProfileComponent,
    ],
    imports: [
      HomeRoutingModule,

      FormsModule,
      ReactiveFormsModule,

      MatProgressSpinnerModule,
      MatRadioModule,
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
      CommonModule


    ],
    providers: [ ListasService, GenerosService, EditorasService ],
    bootstrap: []
  })
  export class ProfileModule { }
  
