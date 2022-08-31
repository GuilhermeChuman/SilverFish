import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ManageBooksService } from './manageBooks.service';
import { rowsAnimation } from 'src/app/animations/table.animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalManagerComponent } from './modalManager/modalManager.component';


@Component({
  selector: 'app-manageBooks',
  templateUrl: './manageBooks.component.html',
  styleUrls: ['./manageBooks.component.scss'],
  animations: [rowsAnimation],
})


export class ManageBooksComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private _manageService: ManageBooksService,
              public dialog: MatDialog){

  }

  ELEMENT_DATA: any[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  ];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumnsEditora: string[] = ['id', 'nome', 'actions'];
  dataSource = this.ELEMENT_DATA;

  editoras: any;
  dataSourceEditora: any;

  async ngOnInit(){
    await this.getEditoras();
    this.dataSourceEditora = new MatTableDataSource(this.editoras);
    this.dataSourceEditora.paginator = this.paginator;
  }

  async getEditoras(){
    this.editoras = await this._manageService.getEditoras();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalManagerComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

}
