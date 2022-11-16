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

    public async getUsers():Promise<any>{

        return this._apiService.getAll(environment.get_allUsers).then( (resp:any) =>{
            if(resp.success){
                return resp.data;
            }
            else{
                this._snack.open(resp.message, 'OK');
                return false;
            }
        });
    }

    public async solicitarEmprestimo(idLivro:any):Promise<boolean> {

        let userData = this.tokenService.decodeData(localStorage.getItem('userData'));
        
        let date = new Date().toLocaleString();

        let dia = date.slice(0,2);
        let mes = date.slice(3,5);
        let ano = date.slice(6,10);

        const formData = {
            idLivro: idLivro,
            idUsuario: userData.id,
            dataEmprestimo: ano+'-'+mes+'-'+dia
        }

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

    public async aprovaEmprestimo(idEmprestimo:any):Promise<any>{

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

    
    public async devolverLivro(formData:any):Promise<any>{

        return this._apiService.add(environment.devolverLivro, formData).then( (resp:any) =>{
            if(resp.success){
                this._snack.open('Devolução realizada com sucesso!', 'OK');
                return resp.data;
            }
            else{
                this._snack.open('Ocorreu um erro ao recuperar os dados, favor consultar o administrador!', 'OK');
                return false;
            }
        });
    }

    public async emprestimoDireto(formData: any):Promise<any>{

        return this._apiService.add(environment.emprestimoDireto, formData).then( (resp:any) =>{
            if(resp.success){
                this._snack.open('Emprpestimo efetuado!', 'OK');
                return true;
            }
            else{
                this._snack.open(resp.message, 'OK');
                return false;
            }
        });

    }

    public async recusaEmprestimo(idEmprestimo:any):Promise<any>{
        
        return this._apiService.getAll(environment.recusarEmprestimo+idEmprestimo).then( (resp:any) =>{
            if(resp.success){
                this._snack.open('Solcitação de Empréstimo recusada! O registro foi excluído', 'OK');
                return resp.data;
            }
            else{
                this._snack.open('Ocorreu um erro ao recuperar os dados, favor consultar o administrador!', 'OK');
                return false;
            }
        });
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