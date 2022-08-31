import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class APIService {

    constructor(private http: HttpClient) {
    }

    async login(data:any){
        return await this.http.post(`${ environment.api_url_local }${environment.auth_login}`,data).toPromise().then(resp =>{
            return resp;
        });
    }

    async getAll(route:any){
        return await this.http.get(`${ environment.api_url_local }${route}`).toPromise().then(resp =>{
            return resp;
        });
    }
}