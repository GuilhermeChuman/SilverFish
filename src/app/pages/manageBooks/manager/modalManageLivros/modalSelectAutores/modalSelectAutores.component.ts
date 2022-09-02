import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AutoresService } from '../../../listAutores/autores.service';


@Component({
  selector: 'app-modal-select-autores',
  templateUrl: './modalSelectAutores.component.html',
  styleUrls: ['./modalSelectAutores.component.scss'],
})


export class ModalSelectAutoresComponent implements OnInit{

  constructor( private _autoresService: AutoresService,
    public dialogRef: MatDialogRef<ModalSelectAutoresComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
  ){ }

  action = this._data.action;
  data = this._data.data;
  title = '';
  autores: any[] = [];
  autoresForm:any = new FormGroup({
    autor: new FormControl('',Validators.required),
  });

  async ngOnInit(){

    switch(this.action){
      case 'create':
        await this._autoresService.getAutores().then( (resp:any) =>{
          this.autores = resp;
        });
        this.title = 'Novo Livro';
        break;
      case 'delete':
        this.title = 'Excluir Livro';
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
    const formData = this.autoresForm.controls.autor.value;
    this.dialogRef.close(formData);
  }

  delete(){
    this.dialogRef.close(true);
  }

}


