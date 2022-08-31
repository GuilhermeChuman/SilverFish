import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from '../../services/api.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable()

export class ManageBooksService {

    constructor(private _snack: MatSnackBar,
                private _apiService: APIService) {}

    getLivros(){

    }

    //EDITORAS
    getEditoras() : Promise<any> {
        return new Promise((resolve, reject) =>{
            this._apiService.getAll(environment.get_allEditoras).then((resp:any) =>{
                if(resp.success)
                    resolve(resp.data);
                else{
                    this._snack.open('Ocorreu algum erro ao acessar as Editoras, por favor contate o administrador', 'OK');
                    reject();
                }
                    
            });
        });
    }

    addEditora(data:any) : Promise<any> {
        return new Promise((resolve, reject) =>{
            this._apiService.add(environment.add_editora, data).then((resp:any) =>{
                if(resp.success){
                    this._snack.open('Editora adicionada com sucesso!', '', {
                        duration: 2000,
                      });
                    resolve(resp.data);
                }
                    
                else{
                    this._snack.open('Ocorreu algum erro ao adicionar uma Editora, por favor contate o administrador', 'OK');
                    reject();
                }
                    
            });
        });
    }

    editEditora(id:any, data:any) : Promise<any> {
        return new Promise((resolve, reject) =>{
            this._apiService.edit(environment.edit_editora, id, data).then((resp:any) =>{
                if(resp.success){
                    this._snack.open('Editora editada com sucesso!', '', {
                        duration: 2000,
                      });
                    resolve(resp.data);
                }
                else{
                    this._snack.open('Ocorreu algum erro ao editar a Editora selecionada, por favor contate o administrador', 'OK');
                    reject();
                }
                    
            });
        });
    }

    deleteEditora(id:any) : Promise<any> {
        return new Promise((resolve, reject) =>{
            this._apiService.delete(environment.delete_editora, id).then((resp:any) =>{
                if(resp.success){
                    this._snack.open('Editora deletada com sucesso!', '', {
                        duration: 2000,
                      });
                    resolve(resp.data);
                }
                else{
                    this._snack.open('Ocorreu algum erro ao deletar a Editora selecionada, por favor contate o administrador', 'OK');
                    reject();
                }
                    
            });
        });
    }

    //AUTORES
    getAutores() : Promise<any> {
        return new Promise((resolve, reject) =>{
            this._apiService.getAll(environment.get_allAutores).then((resp:any) =>{
                if(resp.success)
                    resolve(resp.data);
                else{
                    this._snack.open('Ocorreu algum erro ao acessar os Autores, por favor contate o administrador', 'OK');
                    reject();
                }
                    
            });
        });
    }

}