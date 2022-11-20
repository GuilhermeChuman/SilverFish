import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Chart, registerables } from 'chart.js';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { LivrosService } from '../manageBooks/listLivros/livros.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent {

  constructor(private _LivrosService: LivrosService,
              private _EmprestimoService: EmprestimoService){

}

  dadosEmprestimo: any;
  dadosLivros: any;

  chart: any;
  canvas: any;
  ctx: any;

  chart2: any;
  canvas2: any;
  ctx2: any;

  chartLivroGenero: any;
  canvasLivroGenero: any;
  ctxLivroGenero: any;

  chartMaisEmprestado: any;
  canvasMaisEmprestado: any;
  ctxMaisEmprestado: any;

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async ngAfterContentInit(){

    this.dadosEmprestimo = await this._EmprestimoService.emprestimosStatus();
    this.dadosLivros = await this._LivrosService.allLivrosStatus();

    console.log(this.dadosEmprestimo, this.dadosLivros);

    await this.delay(500);

    // Relação de Empréstimos

    const ListaEmprestimoLabels: any[] = ['Atrasado', 'Devolvido', 'Emprestado', 'Solicitado'];
    const ListaEmprestimoData: any[] = [this.dadosEmprestimo.A, this.dadosEmprestimo.D, this.dadosEmprestimo.E, this.dadosEmprestimo.S];
    const ListaEmprestimoColors: any[] = ['#ff9a9a', '#9affa2', '#f0ff9a', '#7cb0ff'];

    this.canvas = document.getElementById('listaEmprestimo');
    this.ctx = this.canvas.getContext('2d');

    this.chart = new Chart(this.ctx, {
        type: 'doughnut',
        data: {
          labels: ListaEmprestimoLabels,
          datasets: [{
            data: ListaEmprestimoData,
            backgroundColor: ListaEmprestimoColors,
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

    // CANVAS 2
    
    const ListaPorGeneroLabels: any[] = []
    const ListaPorGeneroData: any[] = []
    const ListaPorGeneroColors: any[] = []

    this.dadosLivros.livrosPorGenero.forEach((element:any) => {
      ListaPorGeneroLabels.push(element.genero);
      ListaPorGeneroData.push(element.total);
      ListaPorGeneroColors.push("#" +(Math.floor(Math.random()*16777215).toString(16)));
    });

    this.canvas2 = document.getElementById('livrosPorGenero');
    this.ctx2 = this.canvas2.getContext('2d');

    this.chart2 = new Chart(this.ctx2, {
      type: 'doughnut',
      data: {
        labels: ListaPorGeneroLabels,
        datasets: [{
          data: ListaPorGeneroData,
          backgroundColor: ListaPorGeneroColors,
          hoverOffset: 4
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


    // CANVAS EMPRESTIMOS POR GENERO

    //ordenando livros por genero
    function compareGenero( a:any, b:any ) {
      if ( a.genero < b.genero ){
        return -1;
      }
      if ( a.genero > b.genero ){
        return 1;
      }
      return 0;
    }
    
    let livrosPorGeneroOrdenado = this.dadosLivros.emprestimosPorGenero.sort( compareGenero );

    const livrosGeneroLabels: any[] = [];
    const livrosGeneroData: any[] = [];
    const livrosGeneroColors: any[] = [];

    livrosPorGeneroOrdenado.forEach((element:any) => {
      livrosGeneroLabels.push(element.genero ? element.genero : 'NULL');
      livrosGeneroData.push(element.total);
      livrosGeneroColors.push("#" +(Math.floor(Math.random()*16777215).toString(16)));
    });

    this.canvasLivroGenero = document.getElementById('listaGenero');
    this.ctxLivroGenero = this.canvasLivroGenero.getContext('2d');

    this.chartLivroGenero = new Chart(this.ctxLivroGenero, {
      type: 'bar',
      data: {
        labels: livrosGeneroLabels,
        datasets: [{
          data: livrosGeneroData,
          backgroundColor: livrosGeneroColors
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
        },
        scales:{
          x:{
            display: false
          }
        }
      }
    });

    // CANVAS LIVROS MAIS EMPRESTADOS

    //ordenando livros mais emprestados
    function compareMaisEmprestados( a:any, b:any ) {
      if ( a.total < b.total ){
        return -1;
      }
      if ( a.total > b.total ){
        return 1;
      }
      return 0;
    }
    
    let livrosMaisEmprestados = this.dadosLivros.emprestimosPorLivro.sort( compareMaisEmprestados );

    const maisEmprestadosLabels: any[] = [];
    const maisEmprestadosData: any[] = [];
    const maisEmprestadosColors: any[] = [];

    livrosMaisEmprestados.forEach((element:any) => {
      maisEmprestadosLabels.push(element.titulo);
      maisEmprestadosData.push(element.total);
      maisEmprestadosColors.push("#" +(Math.floor(Math.random()*16777215).toString(16)));
    });

    this.canvasMaisEmprestado = document.getElementById('maisEmprestados');
    this.ctxMaisEmprestado = this.canvasMaisEmprestado.getContext('2d');

    this.chartMaisEmprestado = new Chart(this.ctxMaisEmprestado, {
      type: 'bar',
      data: {
        labels: maisEmprestadosLabels,
        datasets: [{
          data: maisEmprestadosData,
          backgroundColor: maisEmprestadosColors
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
        },
        scales:{
          x:{
            display: false
          }
        }
      }
    });
  }
}
