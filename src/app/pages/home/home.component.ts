import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { JWTService } from 'src/app/auth/jwt.service';
import { ListasService } from 'src/app/services/listas.service';
import { LivrosService } from '../manageBooks/listLivros/livros.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private _jwtSerice: JWTService, 
              private _LivrosService: LivrosService,
              private _ListaService: ListasService,) { }


  myList: any;
  userData: any;
  livros: any[] = [];
  lastBooks: any[] = [];

  async ngOnInit() {
    
    this.userData = await this._jwtSerice.decodeData(localStorage.getItem('userData'));
    this.myList = await this._ListaService.getLista(this.userData.id)
    let acervo = await this._LivrosService.getLivros();

    function compare( a:any, b:any ) {
      if ( a.id < b.id ){
        return -1;
      }
      if ( a.id > b.id ){
        return 1;
      }
      return 0;
    }
    
    this.lastBooks = acervo.sort( compare ).slice(-5);

    this.myList.livros.forEach((element: any) => {
      if(element.status == 'Lendo')
      this.livros.push(element);
    });

  }

  //@ViewChild('sidenav') sidenav: MatSidenav;

  id = 1;

}
