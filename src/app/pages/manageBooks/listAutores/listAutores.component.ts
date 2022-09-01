import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { rowsAnimation } from 'src/app/animations/table.animations';
import { ModalAutorComponent } from '../manager/modalManageAutores/modalAutor.component';
import { AutoresService } from './autores.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-list-autores',
  templateUrl: './listAutores.component.html',
  styleUrls: ['./listAutores.component.scss'],
  animations: [rowsAnimation],
})


export class ListAutoresComponent implements OnInit{

  @ViewChild(MatPaginator) paginatorAutor: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private _manageService: AutoresService,
              private _liveAnnouncer: LiveAnnouncer,
              private _snack: MatSnackBar,
              public dialog: MatDialog){ }

  autores: any;
  sortedData: any;
  dataSourceAutores: any;
  displayedColumnsAutores: string[] = ['id', 'nome', 'actions'];

  async ngOnInit(){

    this.autores = await this._manageService.getAutores();
    this.dataSourceAutores = new MatTableDataSource(this.autores);
    this.dataSourceAutores.paginator = this.paginatorAutor;  
    this.dataSourceAutores.sort = this.sort; 

  }

  async getAutores(){
    this.autores = await this._manageService.getAutores();
    this.dataSourceAutores.data = this.autores;
  }

  async openDialogAutor(action:any, data:any) {
    const dialogRef = this.dialog.open(ModalAutorComponent, {
      disableClose: true,
      data: {
        action: action,
        data: data,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        delete result.id;
        switch(action){
          case 'create':
            this._manageService.addAutor(result).then( (success:any) =>{
              if(success)
                this.getAutores();
            });
            break;
          case 'update':
            this._manageService.editAutor(data.id, result).then( (success:any) =>{
              if(success)
                this.getAutores();
            });
            break;
          case 'delete':
            this._manageService.deleteAutor(data.id).then( (success:any) =>{
              if(success)
                this.getAutores();
            });
            break;
          default:
            this._snack.open('Ocorreu um erro na transferência dos dados. Tente novamente', 'OK');
            break;
        }
      }
    });
  }

  sortData(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}


