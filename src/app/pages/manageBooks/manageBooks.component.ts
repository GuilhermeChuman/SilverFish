import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalManageEditoraComponent } from './manager/modalManageEditora/modalManageEditora.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manageBooks',
  templateUrl: './manageBooks.component.html',
  styleUrls: ['./manageBooks.component.scss']
})

export class ManageBooksComponent implements OnInit{

  constructor(private _snack: MatSnackBar,
              public dialog: MatDialog){

  }

  async ngOnInit(){
  }

}
