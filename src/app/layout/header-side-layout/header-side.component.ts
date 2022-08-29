import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.component.html',
  styleUrls: ['./header-side.component.scss']
})
export class HeaderSideComponent implements OnInit {

  constructor(private router: Router, private _authService: AuthService,) {

  }

  ngOnInit() {

  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  exit(){
    this._authService.logout();
    this.delay(1000);
    this.router.navigate(['/auth/login']);
  }

}
