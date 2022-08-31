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
}