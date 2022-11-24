import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from '../services/api.service';
import { JWTService } from './jwt.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {

    constructor(private _snack: MatSnackBar,
                private router: Router,
                private tokenService: JWTService,
                private _apiService: APIService) {}

    public async login(data:any):Promise<boolean> {
        
        return this._apiService.login(data).then( (resp:any) => {
            if(resp.success){
                localStorage.setItem('userData', this.tokenService.tokenize(resp.data));
                this.router.navigate(['/pages/home']);
                return resp.data;
            }
            else{
                this._snack.open('Usuário ou senha inválidos', 'OK');
                return false
            }
                
        });
    }

    public async signup(data:any):Promise<boolean> {
        
        return this._apiService.signup(data).then( (resp:any) => {
            if(resp.success){
                this._snack.open('Cadastro realizado! Aguardando validação do email', 'OK');
                this.router.navigate(['/auth/login']);
                return true;
            }
            else{
                this._snack.open('Alguma coisa deu errado, contate o administrador do sistema', 'OK');
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