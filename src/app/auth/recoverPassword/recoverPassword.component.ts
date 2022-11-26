import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recoverPassword.component.html',
  styleUrls: ['./recoverPassword.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  constructor(private _snack: MatSnackBar,
              private router: Router,
              private _authService: AuthService) { }

  //regex = new RegExp('[a-z0-9_.-]+@fatec.sp.gov.br');
  regex = "";

  recover = new FormGroup({
    login: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.pattern(this.regex)]),
  });

  ngOnInit(): void {
    //this._authService
  }

  recovery(){
    this._authService.recoverPassword(this.recover.getRawValue()).then( (resp:any) =>{
      if(resp){
        this._snack.open('Recuperação realizada! Uma nova senha era enviada no seu email', 'OK');
        this.router.navigate(['/auth/login']);
      }
    });
  }

  back(){
    
  }

}
