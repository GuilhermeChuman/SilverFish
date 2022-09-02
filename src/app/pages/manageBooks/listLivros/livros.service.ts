import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from '../../../services/api.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable()

export class LivrosService {

    constructor(private _snack: MatSnackBar,
                private _apiService: APIService) {}

    //AUTORES
    getLivros() : Promise<any> {
        return new Promise((resolve, reject) =>{
            this._apiService.getAll(environment.get_allLivros).then((resp:any) =>{
                if(resp.success)
                    resolve(resp.data);
                else{
                    this._snack.open('Ocorreu algum erro ao acessar os Livros, por favor contate o administrador', 'OK');
                    reject();
                }
                    
            });
        });
    }

    addTrabalho(data:any){
        return new Promise((resolve, reject) =>{
            this._apiService.add(environment.add_trabalho, data).then((resp:any) =>{
                if(resp.success){
                    this._snack.open('Autor adicionado com sucesso!', '', {
                        duration: 2000,
                    });
                    resolve(resp.data);
                }
                    
                else{
                    this._snack.open('Ocorreu algum erro ao adicionar um autor, por favor contate o administrador', 'OK');
                    reject();
                }
                    
            });
        });
    }

    deleteTrabalho(id:any){
        return new Promise((resolve, reject) =>{
            this._apiService.add(environment.remove_trabalho, id).then((resp:any) =>{
                if(resp.success){
                    this._snack.open('Autor removido com sucesso!', '', {
                        duration: 2000,
                    });
                    resolve(resp.data);
                }
                    
                else{
                    this._snack.open('Ocorreu algum erro ao adicionar um autor, por favor contate o administrador', 'OK');
                    reject();
                }
                    
            });
        });
    }

    getAutoresByLivro(id:any) : Promise<any> {
        return new Promise((resolve, reject) =>{
            this._apiService.add(environment.get_autores_byLivro, id).then((resp:any) =>{
                if(resp.success)
                    resolve(resp.data);
                    
                else{
                    this._snack.open('Ocorreu algum erro ao resgatar os autores, por favor contate o administrador', 'OK');
                    reject();
                }
                    
            });
        });
    }

    addLivro(data:any) : Promise<any> {
        return new Promise((resolve, reject) =>{
            this._apiService.add(environment.add_livro, data).then((resp:any) =>{
                if(resp.success){
                    this._snack.open('Livro adicionado com sucesso!', '', {
                        duration: 2000,
                    });
                    resolve(resp.data);
                }
                    
                else{
                    this._snack.open('Ocorreu algum erro ao adicionar um Livro, por favor contate o administrador', 'OK');
                    reject();
                }
                    
            });
        });
    }

    editLivro(id:any, data:any) : Promise<any> {
        return new Promise((resolve, reject) =>{
            this._apiService.edit(environment.edit_livro, id, data).then((resp:any) =>{
                if(resp.success){
                    this._snack.open('Livro editado com sucesso!', '', {
                        duration: 2000,
                    });
                    resolve(resp.data);
                }
                else{
                    this._snack.open('Ocorreu algum erro ao editar o Livro selecionado, por favor contate o administrador', 'OK');
                    reject();
                }
                    
            });
        });
    }

    deleteLivro(id:any) : Promise<any> {
        return new Promise((resolve, reject) =>{
            this._apiService.delete(environment.delete_livro, id).then((resp:any) =>{
                if(resp.success){
                    this._snack.open('Livro deletado com sucesso!', '', {
                        duration: 2000,
                    });
                    resolve(resp.data);
                }
                else{
                    this._snack.open('Ocorreu algum erro ao deletar o Livro selecionado, por favor contate o administrador', 'OK');
                    reject();
                }
                    
            });
        });
    }

}