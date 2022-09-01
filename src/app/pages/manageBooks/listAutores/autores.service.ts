import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from '../../../services/api.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable()

export class AutoresService {

    constructor(private _snack: MatSnackBar,
                private _apiService: APIService) {}

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

    addAutor(data:any) : Promise<any> {
        return new Promise((resolve, reject) =>{
            this._apiService.add(environment.add_autor, data).then((resp:any) =>{
                if(resp.success){
                    this._snack.open('Autor adicionada com sucesso!', '', {
                        duration: 2000,
                    });
                    resolve(resp.data);
                }
                    
                else{
                    this._snack.open('Ocorreu algum erro ao adicionar uma Autor, por favor contate o administrador', 'OK');
                    reject();
                }
                    
            });
        });
    }

    editAutor(id:any, data:any) : Promise<any> {
        return new Promise((resolve, reject) =>{
            this._apiService.edit(environment.edit_autor, id, data).then((resp:any) =>{
                if(resp.success){
                    this._snack.open('Autor editada com sucesso!', '', {
                        duration: 2000,
                    });
                    resolve(resp.data);
                }
                else{
                    this._snack.open('Ocorreu algum erro ao editar a Autor selecionada, por favor contate o administrador', 'OK');
                    reject();
                }
                    
            });
        });
    }

    deleteAutor(id:any) : Promise<any> {
        return new Promise((resolve, reject) =>{
            this._apiService.delete(environment.delete_autor, id).then((resp:any) =>{
                if(resp.success){
                    this._snack.open('Autor deletada com sucesso!', '', {
                        duration: 2000,
                    });
                    resolve(resp.data);
                }
                else{
                    this._snack.open('Ocorreu algum erro ao deletar a Autor selecionada, por favor contate o administrador', 'OK');
                    reject();
                }
                    
            });
        });
    }

}