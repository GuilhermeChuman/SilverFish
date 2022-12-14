import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

import { DetalhesLivroRoutingModule } from './detalhesLivro-routing.module';
import { DetalhesLivroComponent } from './detalhesLivro.component';
import { LivrosService } from '../manageBooks/listLivros/livros.service';
import { EmprestarLivroModalComponent } from './emprestarLivroModal/emprestarLivroModal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { AdicionarListaModalComponent } from './adicionarListaModal/adicionarListaModal.component';
import { MatSelectModule } from '@angular/material/select';
import { ListasService } from 'src/app/services/listas.service';

@NgModule({
    declarations: [
      DetalhesLivroComponent, 
      EmprestarLivroModalComponent, 
      AdicionarListaModalComponent
    ],
    imports: [
      DetalhesLivroRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      MatSelectModule,
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
      CommonModule,
      MatDialogModule,
    ],
    providers: [LivrosService, MatDialog, EmprestimoService, ListasService],
    bootstrap: []
  })
  export class DetalhesLivroModule { }
  
