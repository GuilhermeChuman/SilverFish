import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recoverPassword.component.html',
  styleUrls: ['./recoverPassword.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  constructor() { }

  regex = new RegExp('[a-z0-9_.-]+@fatec.sp.gov.br');

  recover = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern(this.regex)]),
  });

  ngOnInit(): void {
  }

  back(){
    
  }

}
