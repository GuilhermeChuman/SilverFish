import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-modal-manage-livros',
  templateUrl: './modalManageLivros.component.html',
  styleUrls: ['./modalManageLivros.component.scss'],
})


export class ModalManageLivrosComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    public dialogRef: MatDialogRef<ModalManageLivrosComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
  ){ }

  data = this._data.data;
  action = this._data.action;
  title = '';

  livrosForm: any;

  async ngOnInit(){
    switch(this.action){
      case 'create':
        this.title = 'Novo Livro';
        this.livrosForm = new FormGroup({
          isbn: new FormControl('',Validators.required),
          titulo: new FormControl('',Validators.required),
          descricao: new FormControl(''),
          volume: new FormControl(''),
          palavraChave1: new FormControl(''),
          palavraChave2: new FormControl(''),
          palavraChave3: new FormControl(''),
          ano: new FormControl(''),
          edicao: new FormControl(''),
          idEditora: new FormControl(''),
          idGenero: new FormControl('')
        });
        break;
      case 'update':
        this.title = 'Atualizar Livro';
        this.livrosForm = new FormGroup({
          id: new FormControl(this.data.id,Validators.required),
          isbn: new FormControl('',Validators.required),
          titulo: new FormControl('',Validators.required),
          descricao: new FormControl(''),
          volume: new FormControl(''),
          palavraChave1: new FormControl(''),
          palavraChave2: new FormControl(''),
          palavraChave3: new FormControl(''),
          ano: new FormControl(''),
          edicao: new FormControl(''),
          idEditora: new FormControl(''),
          idGenero: new FormControl('')
        });
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
    const formData = this.livrosForm?.getRawValue();
    this.dialogRef.close(formData);
  }

  delete(){
    this.dialogRef.close(true);
  }

}


