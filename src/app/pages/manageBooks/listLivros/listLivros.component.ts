import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { rowsAnimation } from 'src/app/animations/table.animations';
import { ModalManageEditoraComponent } from '../manager/modalManageEditora/modalManageEditora.component';
import { ModalManageLivrosComponent } from '../manager/modalManageLivros/modalManageLivros.component';
import { LivrosService } from './livros.service';


@Component({
  selector: 'app-list-livros',
  templateUrl: './listLivros.component.html',
  styleUrls: ['./listLivros.component.scss'],
  animations: [rowsAnimation],
})


export class ListLivrosComponent implements OnInit{

  @ViewChild(MatPaginator)
  paginatorLivros!: MatPaginator;

  constructor(private _manageService: LivrosService,
              private _snack: MatSnackBar,
              public dialog: MatDialog){ }

  livros: any;
  dataSourceLivros: any;
  displayedColumnsLivros: string[] = ['id', 'isbn', 'titulo', 'volume', 'actions'];

  async ngOnInit(){
    this.livros = await this._manageService.getLivros();
    this.dataSourceLivros = new MatTableDataSource(this.livros);
    this.paginatorLivros._intl.nextPageLabel = '';
    this.paginatorLivros._intl.previousPageLabel = '';
    this.paginatorLivros._intl.lastPageLabel = '';
    this.paginatorLivros._intl.firstPageLabel = '';
    this.dataSourceLivros.paginator = this.paginatorLivros;

  }

  async getLivros(){
    this.livros = await this._manageService.getLivros();
    this.dataSourceLivros.data = this.livros;
  }

  async openDialogLivro(action:any, data:any) {
    const dialogRef = this.dialog.open(ModalManageLivrosComponent, {
      disableClose: true,
      data: {
        action: action,
        data: data,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        switch(action){
          case 'create':
            delete result[0].id;
            this._manageService.addLivro(result[0]).then( (success:any) =>{
              if(success){
                result[1].forEach((element:any) => {
                  const formData = {
                    idLivro: success.id,
                    idAutor: element.id 
                  };
                  this._manageService.addTrabalho(formData);
                });
                this.getLivros();
              }
            });
            break;
          case 'update':
            delete result[0].id;
            this._manageService.editLivro(data.id, result[0]).then( (success:any) =>{
              if(success)
                this.getLivros();
            });
            break;
          case 'delete':
            this._manageService.deleteLivro(data.id).then( (success:any) =>{
              if(success)
                this.getLivros();
            });
            break;
          default:
            this._snack.open('Ocorreu um erro na transferência dos dados. Tente novamente', 'OK');
            break;
        }
      }
    });
  }

}


