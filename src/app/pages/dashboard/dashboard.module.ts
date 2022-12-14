import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';

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

import { DashboardComponent } from './dashboard.component';
import { LivrosService } from '../manageBooks/listLivros/livros.service';
import { EmprestimoService } from 'src/app/services/emprestimo.service';

@NgModule({
    declarations: [
      DashboardComponent,
    ],
    imports: [
      DashboardRoutingModule,

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
    ],
    providers: [LivrosService, EmprestimoService],
    bootstrap: []
  })
  export class DashboardModule { }
  
