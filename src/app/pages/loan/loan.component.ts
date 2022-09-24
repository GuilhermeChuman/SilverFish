import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { LivrosService } from '../manageBooks/listLivros/livros.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})


export class LoanComponent {

  constructor(
    private emprestimosService: EmprestimoService,
    public dialog: MatDialog){

  }

  dataSource = [];
  displayedColumns = ['id', 'livro', 'usuario', 'data', 'situacao'];


}
