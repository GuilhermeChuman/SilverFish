import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { JWTService } from 'src/app/auth/jwt.service';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.component.html',
  styleUrls: ['./header-side.component.scss']
})
export class HeaderSideComponent implements OnInit {

  role: any;

  constructor(private router: Router, private _authService: AuthService, private _JWTService: JWTService) {
    this.role = _JWTService.decodeRole(localStorage.getItem('userData'));
  }

  ngOnInit() {

  }

  search(event: any) {
    const query = event.target.value;   
    this.router.navigate(['pages/searchBooks'], {queryParams: {search: query}});
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  exit(){
    this._authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
