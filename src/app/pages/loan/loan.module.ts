import { NgModule } from '@angular/core';

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

import { LoanComponent } from './loan.component';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [
      LoanComponent,
    ],
    imports: [
      LoanRoutingModule,

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
      MatDialogModule,
      
    ],
    providers: [EmprestimoService],
    bootstrap: []
  })
  export class LoanModule { }
  
