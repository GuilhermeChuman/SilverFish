import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-modal-manage-editora',
  templateUrl: './modalManageEditora.component.html',
  styleUrls: ['./modalManageEditora.component.scss'],
})


export class ModalManageEditoraComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    public dialogRef: MatDialogRef<ModalManageEditoraComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
  ){ }

  data = this._data.data;
  action = this._data.action;
  title = '';

  editorasForm: any;

  async ngOnInit(){
    switch(this.action){
      case 'create':
        this.title = 'Nova Editora';
        this.editorasForm = new FormGroup({
          nome: new FormControl('',Validators.required)
        });
        break;
      case 'update':
        this.title = 'Atualizar Editora';
        this.editorasForm = new FormGroup({
          id: new FormControl(this.data.id,Validators.required),
          nome: new FormControl(this.data.nome,Validators.required)
        });
        break;
      case 'delete':
        this.title = 'Excluir Editora';
        break;
      default:
        this.title = 'Ação não encontrada!';
        break;
    }
  }

  close(){
    this.dialogRef.close();
  }

  submit(){
    const formData = this.editorasForm?.getRawValue();
    this.dialogRef.close(formData);
  }

  delete(){
    this.dialogRef.close(true);
  }

}


