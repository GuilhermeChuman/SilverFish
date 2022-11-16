import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { JWTService } from 'src/app/auth/jwt.service';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { LivrosService } from '../../manageBooks/listLivros/livros.service';


@Component({
  selector: 'app-emprestimoDiretoModal-modal',
  templateUrl: './emprestimoDiretoModal.component.html',
  styleUrls: ['./emprestimoDiretoModal.component.scss'],
})

export class EmprestimoDiretoModalComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private _EmprestimoService: EmprestimoService,
    private _LivrosService: LivrosService,
    private _jwt: JWTService,
    public dialogRef: MatDialogRef<EmprestimoDiretoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
  ){ 

  } 

  emprestimoForm: any;
  usuarios: any[] = [];
  livros: any[] = [];

  nomeAtivo = false;

  userFilterCtrl: FormControl = new FormControl();
  livroFilterCtrl: FormControl = new FormControl();
  checkName: FormControl = new FormControl(this.nomeAtivo);
    
  data = this._data;
  title = 'Empréstimo Direto';

  userData = this._jwt.decodeData(localStorage.getItem('userData'));
  
  
  async ngOnInit(){

    this.userFilterCtrl.valueChanges.subscribe(x => {
      this.userFilter(x);
    });

    this.livroFilterCtrl.valueChanges.subscribe(x => {
      this.livrosFilter(x);
    });

    this.checkName.valueChanges.subscribe(x => {
      if(x){
        this.emprestimoForm.controls.idUsuario.setValue(this.userData.id);
        this.nomeAtivo = x;
      }
      else{
        this.emprestimoForm.controls.idUsuario.setValue(); 
        this.nomeAtivo = x;
      }
    });

    let date = new Date().toLocaleString();

    let dia = date.slice(0,2);
    let mes = date.slice(3,5);
    let ano = date.slice(6,10);

    this.emprestimoForm = new FormGroup({
      idUsuario: new FormControl(null,Validators.required),
      idLivro: new FormControl(null,Validators.required),
      dataEmprestimo: new FormControl(ano+'-'+mes+'-'+dia),
      estado: new FormControl('E')
    });

    this.usuarios = await this._EmprestimoService.getUsers();
    this.livros = await this._LivrosService.getLivrosSemEmprestimo();
  }

  async userFilter(x: any){
    if(x.length == 0)
      this.usuarios = await this._EmprestimoService.getUsers();

    else{
      this.usuarios = await this._EmprestimoService.getUsers();
      this.usuarios = this.usuarios.filter(item => item.nome.toLowerCase().includes(x.toLowerCase()));
    }
  }

  async livrosFilter(x: any){
    if(x.length == 0)
      this.livros = await this._LivrosService.getLivrosSemEmprestimo();

    else{
      this.livros = await this._LivrosService.getLivrosSemEmprestimo();
      this.livros = this.livros.filter(item => item.titulo.toLowerCase().includes(x.toLowerCase()));
    }
  }

  close(){
    this.dialogRef.close();
  }

  submit(){
    const formData = this.emprestimoForm.getRawValue();
    this.dialogRef.close(formData);
  }

}


