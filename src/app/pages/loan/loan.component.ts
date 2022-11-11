import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { rowsAnimation } from 'src/app/animations/table.animations';
import { MatSidenav } from '@angular/material/sidenav';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { LivrosService } from '../manageBooks/listLivros/livros.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss'],
  animations: [rowsAnimation],
})


export class LoanComponent {

  @ViewChild(MatPaginator)
  paginatorEmprestimos!: MatPaginator;

  constructor(
    private _emprestimosService: EmprestimoService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog){

  }

  emprestimos: any;
  dataSource: any;
  displayedColumns = ['id', 'nome', 'livro', 'dataEmprestimo', 'dataDevolucao', 'actions'];

  async ngOnInit(){
    this.emprestimos = await this._emprestimosService.getEmprestimos();
    this.dataSource = new MatTableDataSource(this.emprestimos);
    this.paginatorEmprestimos._intl.nextPageLabel = '';
    this.paginatorEmprestimos._intl.previousPageLabel = '';
    this.paginatorEmprestimos._intl.lastPageLabel = '';
    this.paginatorEmprestimos._intl.firstPageLabel = '';
    this.dataSource.paginator = this.paginatorEmprestimos;
  }

  async getEmprestismos(){
    this.emprestimos = await this._emprestimosService.getEmprestimos();
    this.dataSource.data = this.emprestimos;
  }

  sortData(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


}
