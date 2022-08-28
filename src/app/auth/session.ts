export class Session { 
    constructor(public id: number,
                public login:string, 
                public password: string,
                public nome:string, 
                public email:string, 
                public status:string) {
    }
  }