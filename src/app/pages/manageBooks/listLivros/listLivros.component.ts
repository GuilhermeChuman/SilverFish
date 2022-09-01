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

  @ViewChild(MatPaginator) paginatorLivros: MatPaginator | undefined;

  constructor(private _manageService: LivrosService,
              private _snack: MatSnackBar,
              public dialog: MatDialog){ }

  livros: any;
  dataSourceLivros: any;
  displayedColumnsLivros: string[] = ['id', 'isbn', 'titulo', 'volume', 'actions'];

  async ngOnInit(){
    this.livros = await this._manageService.getLivros();
    this.dataSourceLivros = new MatTableDataSource(this.livros);
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
        const formData = {
          nome: result.nome
        }
        switch(action){
          case 'create':
            this._manageService.addLivro(formData).then( (success:any) =>{
              if(success)
                this.getLivros();
            });
            break;
          case 'update':
            this._manageService.editLivro(result.id, formData).then( (success:any) =>{
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

