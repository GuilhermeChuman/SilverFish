import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './activateLogin.component.html',
  styleUrls: ['./activateLogin.component.scss']
})
export class ActivateLoginComponent implements OnInit {

  userToken = '';

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userToken = params['token'];
    });
  }

  ngOnInit(): void {
    console.log(this.userToken);
  }

  back(){
    
  }

}
