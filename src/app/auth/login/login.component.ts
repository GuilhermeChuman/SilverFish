import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _authService: AuthService,
              private router: Router,
              private _snack: MatSnackBar) {
 
  }

  loginForm = new FormGroup({
    login: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  async login(data:FormGroup){

    await this._authService.login(environment.api_url_local,environment.auth_login, data.getRawValue()).then((resp:any) =>{

      if(!resp.success)
        this._snack.open(resp.message,'OK');
      
      else
        this.router.navigate(['/pages/home']);

    });
  }
}
