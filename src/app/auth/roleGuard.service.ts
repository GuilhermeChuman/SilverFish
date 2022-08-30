import { Injectable }       from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService }      from './auth.service';


@Injectable()
export class RoleGuardService implements CanActivate, CanActivateChild {
  	
  constructor(private authService: AuthService, private router: Router, private _snack: MatSnackBar) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.authService.isAdm()) {
      return true; 
    }

    this._snack.open('Você não possui privilégios para acessar essa tela', 'OK');
	return false;

  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }  
} 