import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ManageBooksService } from './manageBooks.service';
import { rowsAnimation } from 'src/app/animations/table.animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalManageEditoraComponent } from './manager/modalManageEditora/modalManageEditora.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-manageBooks',
  templateUrl: './manageBooks.component.html',
  styleUrls: ['./manageBooks.component.scss'],
  animations: [rowsAnimation],
})


export class ManageBooksComponent implements OnInit{

  @ViewChild(MatPaginator) paginatorEditora: MatPaginator | undefined;
  @ViewChild(MatPaginator) paginatorAutor: MatPaginator | undefined;

  constructor(private _manageService: ManageBooksService,
              private _snack: MatSnackBar,
              public dialog: MatDialog){

  }

  editoras: any;
  dataSourceEditora: any;
  displayedColumnsEditora: string[] = ['id', 'nome', 'actions'];

  autores: any;
  dataSourceAutores: any;
  displayedColumnsAutores: string[] = ['id', 'nome', 'actions'];

  async ngOnInit(){

    this.editoras = await this._manageService.getEditoras();
    this.dataSourceEditora = new MatTableDataSource(this.editoras);
    this.dataSourceEditora.paginator = this.paginatorEditora;

    this.autores = await this._manageService.getAutores();
    this.dataSourceAutores = new MatTableDataSource(this.autores);
    this.dataSourceAutores.paginator = this.paginatorAutor;   
  }

  async getEditoras(){
    this.editoras = await this._manageService.getEditoras();
    this.dataSourceEditora.data = this.editoras;
  }

  async getAutores(){
    this.autores = await this._manageService.getAutores();
    this.dataSourceAutores.data = this.autores;
  }

  async openDialogEditora(action:any, data:any) {
    const dialogRef = this.dialog.open(ModalManageEditoraComponent, {
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
            this._manageService.addEditora(formData).then( (success:any) =>{
              if(success)
                this.getEditoras();
            });
            break;
          case 'update':
            this._manageService.editEditora(result.id, formData).then( (success:any) =>{
              if(success)
                this.getEditoras();
            });
            break;
          case 'delete':
            this._manageService.deleteEditora(data.id).then( (success:any) =>{
              if(success)
                this.getEditoras();
            });
            break;
          default:
            this._snack.open('Ocorreu um erro na transferência dos dados. Tente novamente', 'OK');
            break;
        }
      }
    });
  }

  async openDialogAutor(action:any, data:any) {

  }

}
