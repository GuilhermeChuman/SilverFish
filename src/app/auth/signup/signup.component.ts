import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  constructor(private _authService: AuthService,  private router: Router) { }

  regex = new RegExp('[a-z0-9_.-]+@fatec.sp.gov.br');

  passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('passwordV');
  
    return password?.value === confirmPassword?.value ? null : { passwordMismatch: true };
  };

  signup = new FormGroup({
    nome: new FormControl(null,Validators.required),
    email: new FormControl(null, [Validators.required, Validators.pattern(this.regex)]),
    login: new FormControl(null, [Validators.required]),
    password: new FormControl(null, Validators.required),
    passwordV: new FormControl(null, Validators.required ),
  },{ validators: this.passwordMatchingValidatior});


  ngOnInit(): void {
  }

  onPasswordInput() {
    if (this.signup.controls['passwordV'].value == '' || this.signup.controls['passwordV'].value == null)
      this.signup.controls['passwordV'].setErrors([{'required': true}]);
    else if(this.signup.hasError('passwordMismatch'))
      this.signup.controls['passwordV'].setErrors([{'passwordMismatch': true}]);
    else
      this.signup.controls['passwordV'].setErrors(null);
  }

  submit(form: FormGroup){
    const FormGroup = form.getRawValue();
    
    this._authService.signup(FormGroup).then((response: any) =>{
      this.router.navigate(['/auth/login']);
      console.log(response);
    })
  } 

  back(){
    
  }

}
