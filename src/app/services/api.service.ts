import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class APIService {

    constructor(private http: HttpClient) {
    }

    async login(data:any){
        return await this.http.post(`${ environment.api_url }${environment.auth_login}`,data).toPromise().then(resp =>{
            return resp;
        });
    }

    async signup(data:any){
        return await this.http.post(`${ environment.api_url }${environment.auth_signup}`,data).toPromise().then(resp =>{
            return resp;
        });
    }

    async getAll(route:any){
        return await this.http.get(`${ environment.api_url }${route}`).toPromise().then(resp =>{
            return resp;
        });
    }

    async add(route:any, data:any){
        return await this.http.post(`${ environment.api_url }${route}`,data).toPromise().then(resp =>{
            return resp;
        });
    }

    async postWithId(route:any, data:any, id:any){
        return await this.http.post(`${ environment.api_url }${route}${id}`,data).toPromise().then(resp =>{
            return resp;
        });
    }

    async edit(route:any, id:any, data:any){
        return await this.http.put(`${ environment.api_url }${route}${id}`, data).toPromise().then(resp =>{
            return resp;
        });
    }

    async delete(route:any, id:any){
        return await this.http.delete(`${ environment.api_url }${route}${id}`).toPromise().then(resp =>{
            return resp;
        });
    }
}