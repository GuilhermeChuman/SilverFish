import { NgModule } from '@angular/core';

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

import { ManageBooksComponent } from './manageBooks.component';
import { ManageBooksService } from './manageBooks.service';
import { ModalManagerComponent } from './modalManager/modalManager.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [
      ManageBooksComponent,
      ModalManagerComponent
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
      MatDialogModule
      
    ],
    providers: [ManageBooksService, MatDialog],
    bootstrap: []
  })
  export class ManageBooksModule { }
  
