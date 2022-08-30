import * as CryptoJS from 'crypto-js';

export class JWTService {

    tokeninze(data: any){
        let now = new Date().toString();
        now = CryptoJS.AES.encrypt(now, 'IDKFA').toString();

        let salty1 = (Math.floor(Math.random() * (10000 - 90000 + 1)) + 90000).toString();
        salty1 = CryptoJS.AES.encrypt(salty1, 'IDKFA').toString();

        let salty2 = (Math.floor(Math.random() * (12000 - 11000 + 1)) + 11000).toString();
        salty2 = CryptoJS.AES.encrypt(salty2, 'IDKFA').toString();

        let user = data.id+';'+data.login+';'+data.nome+';'+data.password+';'+data.status+';';

        return CryptoJS.AES.encrypt(user, 'IDKFA').toString()+'.'+salty1+'.'+now+'.'+salty2;
    }

    decode(token: any){
        
        if(!token)
            return false;

        let data = token.split('.');

        let bytes = CryptoJS.AES.decrypt(data[2], 'IDKFA');
        var tokenDate = bytes.toString(CryptoJS.enc.Utf8);

        let time = (new Date().getTime() - new Date(tokenDate).getTime())/(1000 * 60);

        return (time < 30);

    }

    decodeRole(token:any, role:any){

        if(!token)
            return false;

        let data = token.split('.');

        let bytes = CryptoJS.AES.decrypt(data[0], 'IDKFA');
        let tokenData = bytes.toString(CryptoJS.enc.Utf8);

        let roleArray = tokenData.split(';');

        return (roleArray[4] == role);

    }


}