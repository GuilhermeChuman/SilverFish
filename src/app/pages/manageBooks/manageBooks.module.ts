import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  

import { ManageBooksRoutingModule } from './manageBooks-routing.module';

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
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';

import { ManageBooksComponent } from './manageBooks.component';
import { ModalManageEditoraComponent } from './manager/modalManageEditora/modalManageEditora.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ListEditorasComponent } from './listEditoras/listEditoras.component';
import { ListAutoresComponent } from './listAutores/listAutores.component';
import { EditorasService } from './listEditoras/editoras.service';
import { AutoresService } from './listAutores/autores.service';
import { LivrosService } from './listLivros/livros.service';
import { ListLivrosComponent } from './listLivros/listLivros.component';
import { ModalAutorComponent } from './manager/modalManageAutores/modalAutor.component';
import { ModalManageLivrosComponent } from './manager/modalManageLivros/modalManageLivros.component';
import { ModalManageGenerosComponent } from './manager/modalManageGeneros/modalManageGeneros.component';
import { ListGenerosComponent } from './listGeneros/listGeneros.component';
import { GenerosService } from './listGeneros/generos.service';

@NgModule({
    declarations: [
      ManageBooksComponent,

      ModalManageEditoraComponent,
      ModalAutorComponent,
      ModalManageLivrosComponent,
      ModalManageGenerosComponent,

      ListEditorasComponent,
      ListAutoresComponent,
      ListLivrosComponent,
      ListGenerosComponent
    ],
    imports: [
      ManageBooksRoutingModule,

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
      MatTabsModule,
      MatPaginatorModule,
      MatSortModule,
      MatDialogModule,
      CommonModule,
      ScrollingModule,
      MatListModule
      
    ],
    providers: [EditorasService, AutoresService, MatDialog, LivrosService, GenerosService],
    bootstrap: []
  })
  export class ManageBooksModule { }
  
