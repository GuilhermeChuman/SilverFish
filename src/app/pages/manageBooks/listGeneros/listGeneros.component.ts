import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { rowsAnimation } from 'src/app/animations/table.animations';
import { ModalManageGenerosComponent } from '../manager/modalManageGeneros/modalManageGeneros.component';
import { GenerosService } from './generos.service';


@Component({
  selector: 'app-list-generos',
  templateUrl: './listGeneros.component.html',
  styleUrls: ['./listGeneros.component.scss'],
  animations: [rowsAnimation],
})


export class ListGenerosComponent implements OnInit{

  @ViewChild(MatPaginator)
  paginatorGenero!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private _manageService: GenerosService,
              private _liveAnnouncer: LiveAnnouncer,
              private _snack: MatSnackBar,
              public dialog: MatDialog){ }

  generos: any;
  dataSourceGenero: any;
  displayedColumnsGenero: string[] = ['id', 'nome', 'actions'];

  async ngOnInit(){

    this.generos = await this._manageService.getGeneros();
    this.dataSourceGenero = new MatTableDataSource(this.generos);
    this.paginatorGenero._intl.nextPageLabel = '';
    this.paginatorGenero._intl.previousPageLabel = '';
    this.paginatorGenero._intl.lastPageLabel = '';
    this.paginatorGenero._intl.firstPageLabel = '';
    this.dataSourceGenero.paginator = this.paginatorGenero;

  }

  async getGeneros(){
    this.generos = await this._manageService.getGeneros();
    this.dataSourceGenero.data = this.generos;
  }

  async openDialogGenero(action:any, data:any) {
    const dialogRef = this.dialog.open(ModalManageGenerosComponent, {
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
            this._manageService.addGenero(result).then( (success:any) =>{
              if(success)
                this.getGeneros();
            });
            break;
          case 'update':
            this._manageService.editGenero(data.id, result).then( (success:any) =>{
              if(success)
                this.getGeneros();
            });
            break;
          case 'delete':
            this._manageService.deleteGenero(data.id).then( (success:any) =>{
              if(success)
                this.getGeneros();
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


