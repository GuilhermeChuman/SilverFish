import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

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
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PesquisaLivroRoutingModule } from './pesquisaLivro-routing.module';
import { PesquisaLivroComponent } from './pesquisaLivro.component';
import { LivrosService } from '../manageBooks/listLivros/livros.service';
import { JWTService } from 'src/app/auth/jwt.service';

@NgModule({
    declarations: [
      PesquisaLivroComponent,
    ],
    imports: [
      PesquisaLivroRoutingModule,

      FormsModule,
      ReactiveFormsModule,
  
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
      MatTableModule,
      MatProgressSpinnerModule,
      MatChipsModule,
      MatBadgeModule,
      MatTooltipModule,
      CommonModule
      
    ],
    providers: [LivrosService, JWTService],
    bootstrap: []
  })
  export class PesquisaLivroModule { }
  
