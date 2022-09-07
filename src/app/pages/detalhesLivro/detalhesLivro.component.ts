import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { LivrosService } from '../manageBooks/listLivros/livros.service';
import { EmprestarLivroModalComponent } from './emprestarLivroModal/emprestarLivroModal.component';

@Component({
  selector: 'app-detalhes-livro',
  templateUrl: './detalhesLivro.component.html',
  styleUrls: ['./detalhesLivro.component.scss']
})


export class DetalhesLivroComponent implements OnInit{

  id:any;
  bookData: any;

  titulo = '';
  descricao = '';
  palavrasChave = '';
  volume = '';
  autores = ' ';

  constructor(private routerParam: ActivatedRoute,
              private _livrosService: LivrosService,
              public dialog: MatDialog,
              private _livroService: LivrosService){
  }


  async ngOnInit() {
    this.getParam();
    await this._livroService.getLivroById(this.id).then( (resp:any) =>{
      this.bookData = resp;
    });

    this.titulo = this.bookData.titulo;
    this.descricao = this.bookData.descricao;
    this.palavrasChave =  ' '+this.bookData.palavraChave1 + '; ' + this.bookData.palavraChave2 + '; ' +
                          this.bookData.palavraChave3
    this.volume = ' '+this.bookData.volume;
    this.bookData.autores.forEach( (element:any) => {
      this.autores += element.autor+'; ';
    });  }


  async getParam() {
    await this.routerParam.queryParams.subscribe( (x:any) =>{
      this.id = x.id;
    });
  }  

  openModal(){

    const dialogRef = this.dialog.open(EmprestarLivroModalComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){

      }
    });

  }

}
