import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { JWTService } from 'src/app/auth/jwt.service';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { ListasService } from 'src/app/services/listas.service';
import { LivrosService } from '../manageBooks/listLivros/livros.service';
import { AdicionarListaModalComponent } from './adicionarListaModal/adicionarListaModal.component';
import { EmprestarLivroModalComponent } from './emprestarLivroModal/emprestarLivroModal.component';

@Component({
  selector: 'app-detalhes-livro',
  templateUrl: './detalhesLivro.component.html',
  styleUrls: ['./detalhesLivro.component.scss']
})


export class DetalhesLivroComponent implements OnInit{

  id:any;
  bookData: any;
  userData = this._jwtService.decodeData(localStorage.getItem('userData'));

  titulo = '';
  descricao = '';
  palavrasChave = '';
  volume = '';
  autores = ' ';

  action = 'create';

  botaoEmprestimo = 'Solicitar Empréstimo';
  botaoAtivo = true;

  botaoLista = 'Adicionar na Lista';
  botaoListaAtivo = true;

  constructor(private routerParam: ActivatedRoute,
              private _jwtService: JWTService,
              private _emprestimosService: EmprestimoService,
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
    });  
  
    this.botaoEmprestimo = await this._emprestimosService.verifyEmprestimo(this.bookData.id).then( (resp:any) =>{
      if(resp == ''){
        this.botaoAtivo = true;
        return 'Solicitar Empréstimo';
      }
        
      else{
        this.botaoAtivo = false;
        return resp;
      }
        
    });

  }


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
        this._emprestimosService.solicitarEmprestimo(this.id);
        this.ngOnInit();
      }
    });

  }

  modalLista(){

    const dialogRef = this.dialog.open(AdicionarListaModalComponent, {
      disableClose: true,
      data: {
        idLivro: this.bookData.id,
        idLista: this.userData.idLista,
        action: this.action
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){

      }
    });

  }

}
