import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-modalManager',
  templateUrl: './modalManager.component.html',
  styleUrls: ['./modalManager.component.scss'],
})


export class ModalManagerComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(){

  }


  async ngOnInit(){

  }

}


