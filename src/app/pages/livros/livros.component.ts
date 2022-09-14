import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { LivrosService } from '../manageBooks/listLivros/livros.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.scss']
})

export class LivrosComponent {

  searchParam = '';
  chunkSize = 12;
  chunkPageSize = 5;
  books: any[] = [];
  paginator: any[] = [];
  pages: any[] = [];
  actualPage: any[] = [];
  actualPagination: any[] = [];
  pagesPerFile: any[] = [];

  actualPageIndex = 0;
  actualPaginationIndex = 0;

  loaded = false;

  constructor(private activatedRoute: ActivatedRoute,
              private _livrosService: LivrosService) {
    this.activatedRoute.queryParams.subscribe(params => {
          this.searchParam = params['search'];
      });
  }

  ngOnInit(){

    this.loadAllBooks();

  }

  loadAllBooks(){

    this._livrosService.getLivros().then( (resp:any) =>{
      this.books = resp;
      for (let i = 0; i < this.books.length; i += this.chunkSize)
        this.paginator.push(this.books.slice(i, i + this.chunkSize));
      
      for(let i = 1; i <= this.paginator.length; i++)
        this.pages.push(i);

      for (let i = 0; i < this.pages.length; i += this.chunkPageSize)
        this.pagesPerFile.push(this.pages.slice(i, i + this.chunkPageSize));

      this.actualPage = this.paginator[this.actualPageIndex];
      this.actualPagination = this.pagesPerFile[this.actualPaginationIndex];

      this.loaded = true;
    });

  }

  previous(){
    if(this.actualPaginationIndex > 0){
      this.actualPaginationIndex--;
      this.actualPagination = this.pagesPerFile[this.actualPaginationIndex];
      this.actualPage = this.paginator[this.actualPagination[this.actualPagination.length-1]-1];
      this.actualPageIndex = this.actualPagination[this.actualPagination.length-1]-1;
    }
  }

  next(){
    if(this.actualPaginationIndex+1 < this.pagesPerFile.length){
      this.actualPaginationIndex++;
      this.actualPagination = this.pagesPerFile[this.actualPaginationIndex];
      this.actualPage = this.paginator[this.actualPagination[0]];
      this.actualPageIndex = this.actualPagination[0]-1;
    }
  }

  accessPage(index:any){
    this.actualPageIndex = index-1;
    this.actualPage = this.paginator[index-1];
  }

}
