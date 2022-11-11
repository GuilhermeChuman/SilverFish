import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from '../services/api.service';
import { JWTService } from '../auth/jwt.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable()

export class EmprestimoService {

    constructor(private _snack: MatSnackBar,
                private tokenService: JWTService,
                private _apiService: APIService) {}

    public async solicitarEmprestimo(idLivro:any):Promise<boolean> {

        let userData = this.tokenService.decodeData(localStorage.getItem('userData'));
        let date = new Date();

        const formData = {
            idLivro: idLivro,
            idUsuario: userData.id,
            dataEmprestimo: date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay()
        }

        console.log(formData);

        return this._apiService.add(environment.solicitarEmprestimo, formData).then( (resp:any) =>{
            if(resp.success){
                this._snack.open('Solicitação efetuada!', 'OK');
                return true;
            }
            else{
                this._snack.open(resp.message, 'OK');
                return false;
            }
        });

    }

    public async verifyEmprestimo(idLivro:any):Promise<any> {

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

    public async getEmprestimos():Promise<boolean> {

        return this._apiService.getAll(environment.emprestimos_getAll).then( (resp:any) =>{
            if(resp.success){
                return resp.data;
            }
            else{
                this._snack.open('Ocorreu um erro ao recuperar os dados, favor consultar o administrador!', 'OK');
                return false;
            }
        });

    }
}