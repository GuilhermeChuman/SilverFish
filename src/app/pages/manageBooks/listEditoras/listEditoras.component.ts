import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { rowsAnimation } from 'src/app/animations/table.animations';
import { ModalManageEditoraComponent } from '../manager/modalManageEditora/modalManageEditora.component';
import { EditorasService } from './editoras.service';


@Component({
  selector: 'app-list-editoras',
  templateUrl: './listEditoras.component.html',
  styleUrls: ['./listEditoras.component.scss'],
  animations: [rowsAnimation],
})


export class ListEditorasComponent implements OnInit{

  @ViewChild(MatPaginator) paginatorEditora: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private _manageService: EditorasService,
              private _liveAnnouncer: LiveAnnouncer,
              private _snack: MatSnackBar,
              public dialog: MatDialog){ }

  editoras: any;
  dataSourceEditora: any;
  displayedColumnsEditora: string[] = ['id', 'nome', 'actions'];

  async ngOnInit(){

    this.editoras = await this._manageService.getEditoras();
    this.dataSourceEditora = new MatTableDataSource(this.editoras);
    this.dataSourceEditora.paginator = this.paginatorEditora;

  }

  async getEditoras(){
    this.editoras = await this._manageService.getEditoras();
    this.dataSourceEditora.data = this.editoras;
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

  sortData(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}


