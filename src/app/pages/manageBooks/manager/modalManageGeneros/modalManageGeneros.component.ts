import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-modal-manage-generos',
  templateUrl: './modalManageGeneros.component.html',
  styleUrls: ['./modalManageGeneros.component.scss'],
})


export class ModalManageGenerosComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    public dialogRef: MatDialogRef<ModalManageGenerosComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
  ){ }

  data = this._data.data;
  action = this._data.action;
  title = '';

  generosForm: any;

  async ngOnInit(){
    switch(this.action){
      case 'create':
        this.title = 'Novo Gênero';
        this.generosForm = new FormGroup({
          nome: new FormControl('',Validators.required),
          descricao: new FormControl('',Validators.required),
        });
        break;
      case 'update':
        this.title = 'Atualizar Gênero';
        this.generosForm = new FormGroup({
          id: new FormControl(this.data.id,Validators.required),
          nome: new FormControl(this.data.nome,Validators.required),
          descricao: new FormControl(this.data.descricao,Validators.required),
        });
        break;
      case 'delete':
        this.title = 'Excluir Gênero';
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
    const formData = this.generosForm?.getRawValue();
    this.dialogRef.close(formData);
  }

  delete(){
    this.dialogRef.close(true);
  }

}


