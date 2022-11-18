import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from './api.service';
import { JWTService } from '../auth/jwt.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable()

export class ListasService {

    constructor(private _snack: MatSnackBar,
                private tokenService: JWTService,
                private _apiService: APIService) {}

    public async getLista(idUsuario:any):Promise<any>{

        return this._apiService.getAll(environment.getListaById+idUsuario).then( (resp:any) =>{
            if(resp.success){
                return resp.data;
            }
            else{
                this._snack.open(resp.message, 'OK');
                return false;
            }
        });
    }

    public async getStatus():Promise<any>{

        return this._apiService.getAll(environment.getStatus).then( (resp:any) =>{
            if(resp.success){
                return resp.data;
            }
            else{
                this._snack.open(resp.message, 'OK');
                return false;
            }
        });
    }

    public async verifyLivroNaLista(idLivro:any):Promise<any> {

        let userData = this.tokenService.decodeData(localStorage.getItem('userData'));

        let response = '';

        //Verificar se o usuário solicitou empresttimo
        response = await this._apiService.getAll(environment.verifySolicitacao+userData.id+'/'+idLivro).then( (resp:any) =>{
            if(resp.success)
                if(resp.data)
                    return 'Você já solicitou empréstimo';
                else
                    return '';
            else
                this._snack.open('Ocorreu um erro na comunicação com o servidor, contate o administrador do sistema', 'OK');
                return 'error';
        });

        //Verificar se o livro em si está emprestado
        if(response == '')
            response = await this._apiService.getAll(environment.verifyEmprestimo+idLivro).then( (resp:any) =>{
                if(resp.success)
                    if(resp.data)
                        return 'Este livro já foi emprestado';
                    else
                        return '';
                else
                    this._snack.open('Ocorreu um erro na comunicação com o servidor, contate o administrador do sistema', 'OK');
                    return 'error';
            });

        return response;
    }

    public async gravaLivroLista(idEmprestimo:any):Promise<any>{

        return this._apiService.getAll(environment.aprovarEmprestimo+idEmprestimo).then( (resp:any) =>{
            if(resp.success){
                this._snack.open('Solcitação de Empréstimo aprovada!', 'OK');
                return resp.data;
            }
            else{
                this._snack.open('Ocorreu um erro ao recuperar os dados, favor consultar o administrador!', 'OK');
                return false;
            }
        });
    }

}