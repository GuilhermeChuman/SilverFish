import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from '../services/api.service';
import { JWTService } from './jwt.service';
import { MatSnackBar} from '@angular/material/snack-bar';

@Injectable()

export class AuthService {

    constructor(private _snack: MatSnackBar,
                private tokenService: JWTService,
                private _apiService: APIService) {}

    public async login(data:any):Promise<boolean> {
        
        return this._apiService.login(data).then( (resp:any) => {
            if(resp.success){
                localStorage.setItem('userData', this.tokenService.tokenize(resp.data));
                return true;
            }
            else{
                this._snack.open('Usuário ou senha inválidos', 'OK');
                return false
            }
                
        });
    }

    public isLogged(){
        return this.tokenService.decode(localStorage.getItem('userData')?.toString());
    }

    public isAdm(){
        return this.tokenService.decodeRole(localStorage.getItem('userData')?.toString()) == 'A';
    }

    public logout(){
        localStorage.removeItem('userData');
    }
}