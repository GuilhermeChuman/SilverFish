import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Chart, registerables } from 'chart.js';
import { JWTService } from 'src/app/auth/jwt.service';
Chart.register(...registerables);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, AfterContentInit{

  constructor(private _jwtSerice: JWTService) { }

  userData: any;
  nome: any = '';

  canvas: any;
  ctx: any;

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

    await this.delay(500);

    this.canvas = document.getElementById('stats');
    this.ctx = this.canvas.getContext('2d');

    this.canvas2 = document.getElementById('stats2');
    this.ctx2 = this.canvas2.getContext('2d');

    this.canvas3 = document.getElementById('stats3');
    this.ctx3 = this.canvas3.getContext('2d');

    const chart = new Chart(this.ctx, {
        type: 'doughnut',
        data: {
          labels: [
            'Red',
            'Blue',
            'Yellow'
          ],
          datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title:{
              display: true,
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

    const chart3 = new Chart(this.ctx3, {
      type: 'line',
      data: {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [100, 150, 200],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title:{
            display: true,
            text: 'Histórico de leitura'
          },
          legend: {
            display: false,
          } 
        }
      }
    });

    const chart2 = new Chart(this.ctx2, {
      type: 'bar',
      data: {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [100, 150, 200],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title:{
            display: true,
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
