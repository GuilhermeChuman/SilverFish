import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {}

    login(api_url: string, enpoint: string, data:any){

        return this.http.post<any>(`${ api_url }${enpoint}`,data).toPromise();
    }
}