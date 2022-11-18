import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-my-List',
  templateUrl: './myList.component.html',
  styleUrls: ['./myList.component.scss'],
})

export class MyListComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    public dialogRef: MatDialogRef<MyListComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
  ){} 
  
  data = this._data;
  mainList: any[] = [];

  async ngOnInit(){

    this.data.todosStatus.forEach((element:any) => {
      let array: any[] = [];
      this.data.lista.livros.forEach( (x:any) => {
        if(element.nome === x.status)
          array.push(x);
      });
      element["Livros"] = array;
    });

    console.log(this.data.todosStatus);

  }

  close(){
    this.dialogRef.close();
  }

  submit(){
    this.dialogRef.close(true);
  }

}


