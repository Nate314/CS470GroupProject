import * as jwt from 'jwt-simple';
import * as requestPromise from 'request-promise';
import * as crypt from './crypt.json';
import './src/resources/config';
import { User, Guild as Server } from 'discord.js';

let globalIP: string;
const key = crypt.rsaprivatekey;
let token: string;


class HttpClient {
    public static getOptions(uri: string, body?: any) {
        let options = {
            uri: uri,
            headers: {
                "content-type": 'application/json',
            }
        };
        if (body) {
            options['body'] = body;
        }
        if (!uri.includes('auth') || uri.includes('auth/login/')) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }
        console.log(options);
        return options;
    }

    public static requestWithAuthentication(requestMethod, options) {
        if (options['uri'].includes('auth')) {
            return requestMethod(options);
        } else {
            return authenticate(globalIP).then(_ => {
                return requestMethod(options);
            });
        }
    }

    public static get(uri: string) {
        return HttpClient.requestWithAuthentication(requestPromise.get, this.getOptions(uri));
        // return requestPromise.get(this.getOptions(uri));
    }

    public static post(uri: string, body: any) {
        return HttpClient.requestWithAuthentication(requestPromise.post, this.getOptions(uri, body));
        // return requestPromise.post(this.getOptions(uri, body));
    }

    public static put(uri: string, body: any) {
        return HttpClient.requestWithAuthentication(requestPromise.put, this.getOptions(uri, body));
        // return requestPromise.put(this.getOptions(uri, body));
    }
}

export const authenticate = (ip: string): Promise<any> => {
    if (ip) globalIP = ip;
    else ip = globalIP;
    const body = JSON.stringify({token:crypt.token, username: '', password: ''}) || encode({ "E.A.": "Sports" });
    console.log(`${ip}: ${body}`);
    return HttpClient.post(`${ip}auth/login`, body)
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