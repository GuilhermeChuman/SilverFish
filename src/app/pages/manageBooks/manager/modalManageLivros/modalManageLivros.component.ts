import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LivrosService } from '../../listLivros/livros.service';
import { ModalSelectAutoresComponent } from './modalSelectAutores/modalSelectAutores.component';


@Component({
  selector: 'app-modal-manage-livros',
  templateUrl: './modalManageLivros.component.html',
  styleUrls: ['./modalManageLivros.component.scss'],
})


export class ModalManageLivrosComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(  public dialog: MatDialog,
                private _manageService: LivrosService,
                private _snack: MatSnackBar,
                public dialogRef: MatDialogRef<ModalManageLivrosComponent>,
                @Inject(MAT_DIALOG_DATA) public _data: any,
  ){ }

  data = this._data.data;
  action = this._data.action;
  autores: any[] = [];
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
          isbn: new FormControl(this.data.isbn,Validators.required),
          titulo: new FormControl(this.data.titulo,Validators.required),
          descricao: new FormControl(this.data.descricao),
          volume: new FormControl(this.data.volume),
          palavraChave1: new FormControl(this.data.palavraChave1),
          palavraChave2: new FormControl(this.data.palavraChave2),
          palavraChave3: new FormControl(this.data.palavraChave3),
          ano: new FormControl(this.data.ano),
          edicao: new FormControl(this.data.edicao),
          idEditora: new FormControl(this.data.idEditora),
          idGenero: new FormControl(this.data.idGenero)
        });
        this.getAutores();
        break;
      case 'delete':
        this.title = 'Excluir Livro';
        break;
      default:
        this.title = 'Ação não encontrada!';
        break;
    }
  }

  async openDialogLivro(action:any, data:any) {
    const dialogRef = this.dialog.open(ModalSelectAutoresComponent, {
      disableClose: true,
      data: {
        action: action,
        data: data,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        switch(action){
          case 'create':
            this._manageService.addTrabalho(result).then( (success:any) =>{
              if(success)
                this.getAutores();
            });
            break;
          case 'delete':
            this._manageService.deleteTrabalho(data.id).then( (success:any) =>{
              if(success)
                this.getAutores();
            });
            break;
          default:
            this._snack.open('Ocorreu um erro na transferência dos dados. Tente novamente', 'OK');
            break;
        }
      }
    });
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

  async getAutores(){
    await this._manageService.getAutoresByLivro(this.data.id).then( (resp:any) =>{
      this.autores = resp;
    });
  }

}


