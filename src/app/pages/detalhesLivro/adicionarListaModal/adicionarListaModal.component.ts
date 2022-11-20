import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ListasService } from 'src/app/services/listas.service';


@Component({
  selector: 'app-adicionar-lista-modal',
  templateUrl: './adicionarListaModal.component.html',
  styleUrls: ['./adicionarListaModal.component.scss'],
})

export class AdicionarListaModalComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor( private _ListasService: ListasService,
    public dialogRef: MatDialogRef<AdicionarListaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
  ){ }

  title = 'Manutenção lista';

  livrosForm = new FormGroup({
    idStatus: new FormControl(null,Validators.required),
    idLivro: new FormControl(null),
    idLista: new FormControl(null)
  });
  
  data = this._data;
  action = this.data.action;
  msg = this.data.msg;

  status: any[] = [];

  async ngOnInit(){

    this.status = await this._ListasService.getStatus();

    this.livrosForm = new FormGroup({
      idStatus: new FormControl(this.data.idStatus,Validators.required),
      idLivro: new FormControl(this.data.idLivro),
      idLista: new FormControl(this.data.idLista)
    });

  }

  close(){
    this.dialogRef.close();
  }

  submit(){
    const formControl = this.livrosForm.getRawValue();
    this.dialogRef.close(formControl);
  }

}


