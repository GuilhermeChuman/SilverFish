import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-emprestar-livro-modal',
  templateUrl: './loanModal.component.html',
  styleUrls: ['./loanModal.component.scss'],
})


export class LoanModalComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    public dialogRef: MatDialogRef<LoanModalComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
  ){ 

  } 
  
  data = this._data;
  title = '';
  text = '';

  async ngOnInit(){

    if( this.data == 'aprove'){
      this.title = 'Aprovar empréstimo';
      this.text = 'Deseja aprovar o empréstimo deste livro?';
    }
    else{
      this.title = 'Reprovar empréstimo';
      this.text = 'Deseja reprovar o empréstimo deste livro?(O registro será excluído)';
    }

  }

  close(){
    this.dialogRef.close();
  }

  submit(){
    this.dialogRef.close(true);
  }

}


