import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of, from, BehaviorSubject } from 'rxjs';
import { APIService } from '../services/api.service';
import { catchError, retry } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Session } from './session';

@Injectable()

export class AuthService {

    constructor(private http: HttpClient, 
                private _apiService: APIService) {}


    private isloggedIn = new BehaviorSubject(false);
    private loggedInUser: any | undefined;

    getAllUsers():  Observable<Session[]>{

        let usersObservable : any[] = [];

        this._apiService.users.forEach( (element:any) => {
            usersObservable.push(new Session(element.id, 
                                                element.login, 
                                                element.password,
                                                element.nome, 
                                                element.email, 
                                                element.status));
        });
        
    return of(usersObservable);

    }

    login(data:any): Observable<BehaviorSubject<boolean>>{

        this.getAllUsers();

        return this.getAllUsers().pipe(map(users => {
		let user = users.find(user => (user.login === data.login) && (user.password === data.password));
            if(user) {
			    this.isloggedIn.next(true);
			    this.loggedInUser = new BehaviorSubject(user);
                this.loggedInUser.subscribe();
		} else {
			this.isloggedIn.next(false);
            this.loggedInUser.subscribe();  
		} 	
        return this.isloggedIn;
	    }));
    }

    setLoggedOut(){
        this.isloggedIn.next(false);
        this.loggedInUser.next(undefined);
    }

    isLogged(){
        console.log(this.isloggedIn.value);
        return this.isloggedIn.value;
    }
}