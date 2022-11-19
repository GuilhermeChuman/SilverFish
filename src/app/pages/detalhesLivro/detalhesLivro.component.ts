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
  status: any;

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
              private _listasService: ListasService,
              public dialog: MatDialog,
              private _livroService: LivrosService){
  }


  async ngOnInit() {

    this.getParam();
    await this._livroService.getLivroById(this.id).then( (resp:any) =>{
      this.bookData = resp;
    });

    this.botaoAtivo = await this._livroService.verifyLivroNaLista(this.userData.idLista, this.bookData.id)

    if(this.botaoAtivo){
      this.action = 'update';
      this.botaoLista = 'Gerenciar na Lista';
      this.status = await this._listasService.getStatusLivroNaLista(this.userData.idLista, this.bookData.id)
    }
    else{
      this.action = 'create';
      this.botaoLista = 'Adicionar na Lista';
      this.status = null;
    }
    
    this.autores = '';
    this.palavrasChave = '';


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
        idStatus: this.status,
        action: this.action
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let form = {
          idLista: parseInt(result.idLista),
          idLivro: result.idLivro,
          idStatus: result.idStatus
        }
        if(result.idStatus == 'R'){
          this._listasService.removeLivroLista(result.idLista, result.idLivro);
          this.ngOnInit();
        }
        else{
          this._listasService.gravaLivroLista(form);
          this.ngOnInit();
        }
      }
    });

  }

}
