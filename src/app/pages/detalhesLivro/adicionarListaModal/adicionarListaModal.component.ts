import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-adicionar-lista-modal',
  templateUrl: './adicionarListaModal.component.html',
  styleUrls: ['./adicionarListaModal.component.scss'],
})

export class AdicionarListaModalComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    public dialogRef: MatDialogRef<AdicionarListaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
  ){ }

  title = 'Manutenção lista';

  async ngOnInit(){

  }

  close(){
    this.dialogRef.close();
  }

  submit(){
    this.dialogRef.close(true);
  }

}


