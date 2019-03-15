import * as jwt from 'jwt-simple';
import * as requestPromise from 'request-promise';
import * as crypt from './crypt.json';
import './src/resources/config';
import { User, Guild as Server } from 'discord.js';

const key = crypt.rsaprivatekey;
let token: string;


class HttpClient {
    public static getOptions(uri: string, body?: any) {
        let options = {
            uri: uri,
            headers: {
                "content-type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        };
        if (body) {
            options['body'] = body;
        }
        return options;
    }

    public static get(uri: string) {
        return requestPromise.get(this.getOptions(uri));
    }

    public static post(uri: string, body: any) {
        return requestPromise.post(this.getOptions(uri, body));
    }

    public static put(uri: string, body: any) {
        return requestPromise.put(this.getOptions(uri, body));
    }
}

export const authenticate = (ip: string): Promise<any> => {

    const body = encode({ "E.A.": "Sports" });
    console.log(`${ip}: ${body}`);

    return HttpClient.put(`${ip}auth/login`, `"${body}"`)
    .then(body => {
        console.log(`${body}`);
        token = JSON.parse(body)['jwt'];
        console.log(token);
        return token;
    });
}
export const helloWorldApi = (ip: string, body: any): Promise<any> => {

    console.log(token);

    return HttpClient.post(`${ip}helloworld`, body);
}
export const getLoginTokenForUser = (ip: string, id: string, callback: (token: string) => void): Promise<any> => {

    console.log(token);

    return HttpClient.get(`${ip}auth/login/${id}`).then(body => {
        callback(JSON.parse(body)['jwt']);
        return body;
    });
}

export const addBatch = (ip: string, entity: 'user' | 'server', batch: any[]): Promise<any> => {
    /*batch.map(({ServerID, ServerURL, CreationDate}) => {
        /*const stamp: string = 
                    JSON.stringify(createdAt.toJSON())
        //             .replace('T', 'H')
                     .replace('Z', '');
                     zz
    })*/
    return HttpClient.post(`${ip}api/addbatch/${entity}s`, JSON.stringify(batch));
}

export const fetchAll = (ip: string, entity: string, listener?: (body: any) => (void)): Promise<any> => {

    if (!entity) return Promise.reject(`No entity argument passed.`);

    return HttpClient.get(`${ip}api/dto/${entity}`)
     .then((body) => {
        const bodyAsJSON = JSON.parse(body);
        if (listener) listener(bodyAsJSON);
        return bodyAsJSON;
    });
}

export const transferCurrency = (ip: string, to: User | any, from: User | "0" | any, amount: number) => {
    const body = {
        Sender: from.id || "0",
        Receiver: to.id,
        amount: amount,
    }

    return HttpClient.post(`${ip}api/currency/transfer`, JSON.stringify(body));
}

export const encode = (body: any) => jwt.encode(body, key, "RS256");

/*
https://stackoverflow.com/questions/23714383/what-are-all-the-possible-values-for-http-content-type-header

*/