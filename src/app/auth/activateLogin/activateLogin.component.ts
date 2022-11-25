import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './activateLogin.component.html',
  styleUrls: ['./activateLogin.component.scss']
})
export class ActivateLoginComponent implements OnInit {

  userToken = '';
  tokenValid = false;
  buttonData: any;

  constructor(private activatedRoute: ActivatedRoute, 
              private router: Router, 
              private _authService: AuthService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userToken = params['token'];
    });
  }

  ngOnInit(): void {
    this._authService.validateToken(this.userToken).then( (resp:any) =>{
      this.tokenValid = resp;
    })
  }

  login(){
    this.router.navigate(['/auth/login']);
  }
}
