import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-modal-autor',
  templateUrl: './modalAutor.component.html',
  styleUrls: ['./modalAutor.component.scss'],
})


export class ModalAutorComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    public dialogRef: MatDialogRef<ModalAutorComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
  ){ }

  data = this._data.data;
  action = this._data.action;
  title = '';

  autoresForm: any;

  async ngOnInit(){
    switch(this.action){
      case 'create':
        this.title = 'Nova Autor';
        this.autoresForm = new FormGroup({
          nome: new FormControl('',Validators.required)
        });
        break;
      case 'update':
        this.title = 'Atualizar Autor';
        this.autoresForm = new FormGroup({
          id: new FormControl(this.data.id,Validators.required),
          nome: new FormControl(this.data.nome,Validators.required)
        });
        break;
      case 'delete':
        this.title = 'Excluir Autor';
        break;
      default:
        this.title = 'Ação não encontrada!';
        break;
    }
  }

  close(){
    this.dialogRef.close();
  }

  submit(){
    const formData = this.autoresForm?.getRawValue();
    this.dialogRef.close(formData);
  }

  delete(){
    this.dialogRef.close(true);
  }

}


