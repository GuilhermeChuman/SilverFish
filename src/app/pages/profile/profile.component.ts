import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Chart, registerables } from 'chart.js';
import { JWTService } from 'src/app/auth/jwt.service';
import { ListasService } from 'src/app/services/listas.service';
import { EditorasService } from '../manageBooks/listEditoras/editoras.service';
import { GenerosService } from '../manageBooks/listGeneros/generos.service';
Chart.register(...registerables);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, AfterContentInit{

  constructor(private _jwtSerice: JWTService, 
              private _ListaService: ListasService,
              private _GenerosService: GenerosService,
              private _EditorasService: EditorasService) { }

  selectedTheme = 'generos';

  classificacoesLabels: any[] = [];
  classificacoesValues: any[] = [];
  classificacoesColors: any[] = [];

  livrosPorStatus: any[] = [];
  livrosPorGenero: any[] = [];
  livrosPorEditora: any[] = [];


  userData: any;
  nome: any = '';

  lista: any;

  chart: any;
  canvas: any;
  ctx: any;

  chart2: any;
  canvas2: any;
  ctx2: any;

  canvas3: any;
  ctx3: any;

  ngOnInit() {

  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async ngAfterContentInit(){

    this.userData = this._jwtSerice.decodeData(localStorage.getItem('userData'));
    this.nome = this.userData.nome;

    this.lista = await this._ListaService.getLista(this.userData.id)
    
    var livros = this.lista.livros;

    //Contando Generos ########################################################

    //const todosGeneros = await this._GenerosService.getGeneros();

    const responseGenero = [...livros.reduce( (mp:any, o:any) => {
      if (!mp.has(o.genero)) mp.set(o.genero, { ...o, count: 0 });
      mp.get(o.genero).count++;
      return mp;
    }, new Map).values()];

    responseGenero.forEach(element => {
      let obj = { 'Genero': element.genero == null ? 'Nulo' : element.genero, 'Quantidade': element.count}
      this.livrosPorGenero.push(obj);
    });

    //Contando Status ########################################################

    const todosStatus = await this._ListaService.getStatus();

    const responseStatus = [...livros.reduce( (mp:any, o:any) => {
      if (!mp.has(o.status)) mp.set(o.status, { ...o, count: 0 });
      mp.get(o.status).count++;
      return mp;
    }, new Map).values()];

    todosStatus.forEach((x:any) => {

      let obj = { Status: x.nome, Quantidade: 0, Cor: x.cor}

      responseStatus.forEach(element => {
        if(x.nome == element.status)
          obj.Quantidade = element.count

      });

      this.livrosPorStatus.push(obj);
    });

    //Status Charts Data
    const statusLabels: any[] = [];
    const statusValues: any[] = [];
    const statusColors: any[] = [];
    this.livrosPorStatus.forEach( element => {
      statusLabels.push(element.Status);
      statusValues.push(element.Quantidade);
      statusColors.push(element.Cor);
    })

    //Classificações Charts Data
    this.livrosPorGenero.forEach( element => {
      this.classificacoesLabels.push(element.Genero);
      this.classificacoesValues.push(element.Quantidade);
      this.classificacoesColors.push("#" +(Math.floor(Math.random()*16777215).toString(16)));
    })
    
    await this.delay(500);

    this.canvas = document.getElementById('listaLeitura');
    this.ctx = this.canvas.getContext('2d');

    this.canvas2 = document.getElementById('listaGenero');
    this.ctx2 = this.canvas2.getContext('2d');

    this.chart = new Chart(this.ctx, {
        type: 'doughnut',
        data: {
          labels: statusLabels,
          datasets: [{
            label: 'My First Dataset',
            data: statusValues,
            backgroundColor: statusColors,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title:{
              display: false,
              text: 'Lista de Livros'
            },
            legend: {
              position: 'right',
              labels:{
                color: 'black',
                font:{
                  size: 18,
                  weight: 'bold'
                }
              }
            }
          }
        }
    });

    this.chart2 = new Chart(this.ctx2, {
      type: 'bar',
      data: {
        labels: this.classificacoesLabels,
        datasets: [{
          label: 'My First Dataset',
          data: this.classificacoesValues,
          backgroundColor: this.classificacoesColors
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title:{
            display: false,
            text: 'Gosto por gênero'
          },
          legend: {
            display: false,
          }
        }
      }
    });

  }

}
