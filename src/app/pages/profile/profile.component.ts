import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, AfterViewInit{

  constructor() { }
  
  canvas: any;
  ctx: any;
  
  ngOnInit() {

  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async ngAfterViewInit(){

    await this.delay(500);

    this.canvas = document.getElementById('stats');
    this.ctx = this.canvas.getContext('2d');

    const data = {
      
    };

    const config = {
      type: 'doughnut',
      data: data,
    };

    let chart = new Chart(this.ctx, {
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

  }

}
