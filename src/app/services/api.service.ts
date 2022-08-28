import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class APIService {

    users:any

    constructor(private http: HttpClient) {
        this.http.get(`${ environment.api_url_local }${environment.get_allUsers}`).subscribe( (resp:any) =>{
            this.users = resp.data;
        });
    }

    async login(data:any){
        return await this.http.post(`${ environment.api_url_local }${environment.auth_login}`,data).toPromise().then(resp =>{
            return resp;
        });
    }
}