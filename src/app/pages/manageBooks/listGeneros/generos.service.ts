import { Injectable } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable()

export class GenerosService {

    constructor(private _snack: MatSnackBar,
                private _apiService: APIService) {}
    //GeneroS
    getGeneros() : Promise<any> {
        return new Promise((resolve, reject) =>{
            this._apiService.getAll(environment.get_allGeneros).then((resp:any) =>{
                if(resp.success)
                    resolve(resp.data);
                else{
                    this._snack.open('Ocorreu algum erro ao acessar as Generos, por favor contate o administrador', 'OK');
                    reject();
                }
                    
            });
        });
    }

    addGenero(data:any) : Promise<any> {
        return new Promise((resolve, reject) =>{
            this._apiService.add(environment.add_genero, data).then((resp:any) =>{
                if(resp.success){
                    this._snack.open('Genero adicionada com sucesso!', '', {
                        duration: 2000,
                    });
                    resolve(resp.data);
                }
                    
                else{
                    this._snack.open('Ocorreu algum erro ao adicionar uma Genero, por favor contate o administrador', 'OK');
                    reject();
                }
                    
            });
        });
    }

    editGenero(id:any, data:any) : Promise<any> {
        return new Promise((resolve, reject) =>{
            this._apiService.edit(environment.edit_genero, id, data).then((resp:any) =>{
                if(resp.success){
                    this._snack.open('Genero editada com sucesso!', '', {
                        duration: 2000,
                    });
                    resolve(resp.data);
                }
                else{
                    this._snack.open('Ocorreu algum erro ao editar o Genero selecionado, por favor contate o administrador', 'OK');
                    reject();
                }
                    
            });
        });
    }

    deleteGenero(id:any) : Promise<any> {
        return new Promise((resolve, reject) =>{
            this._apiService.delete(environment.delete_genero, id).then((resp:any) =>{
                if(resp.success){
                    this._snack.open('Genero deletada com sucesso!', '', {
                        duration: 2000,
                    });
                    resolve(resp.data);
                }
                else{
                    this._snack.open('Ocorreu algum erro ao deletar o Genero selecionado, por favor contate o administrador', 'OK');
                    reject();
                }
                    
            });
        });
    }
}