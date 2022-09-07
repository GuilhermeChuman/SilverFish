import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-emprestar-livro-modal',
  templateUrl: './emprestarLivroModal.component.html',
  styleUrls: ['./emprestarLivroModal.component.scss'],
})


export class EmprestarLivroModalComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    public dialogRef: MatDialogRef<EmprestarLivroModalComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
  ){ }

  title = 'Solicitar empréstimo';

  async ngOnInit(){

  }

  close(){
    this.dialogRef.close();
  }

  submit(){
    this.dialogRef.close(true);
  }

}


