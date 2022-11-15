import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanRoutingModule } from './loan-routing.module';

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
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoanComponent } from './loan.component';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoanModalComponent } from './loanModal/loanModal.component';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { EmprestimoDiretoModalComponent } from './emprestimoDiretoModal/emprestimoDiretoModal.component';
import { LivrosService } from '../manageBooks/listLivros/livros.service';
import { JWTService } from 'src/app/auth/jwt.service';



@NgModule({
    declarations: [
      LoanComponent,
      EmprestimoDiretoModalComponent,
      LoanModalComponent
    ],
    imports: [
      LoanRoutingModule,
      CommonModule,
      FormsModule,
      MatCheckboxModule,
      MatFormFieldModule,
      NgxMatSelectSearchModule,
      MatListModule,
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
      MatDialogModule,
      MatPaginatorModule
      
    ],
    providers: [EmprestimoService, LivrosService, JWTService],
    bootstrap: []
  })
  export class LoanModule { }
  
