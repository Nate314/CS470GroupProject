import * as jwt from 'jwt-simple';
import * as request from 'request';
import * as requestPromise from 'request-promise';
import * as crypt from './crypt.json';
import './src/resources/config';
import { User, Guild as Server } from 'discord.js';

const key = crypt.rsaprivatekey;
let token: string;

export const authenticate = (ip: string): Promise<any> => {

    const body = encode({ "E.A.": "Sports" });
    console.log(`${ip}: ${body}`);

    const options = {
        uri: `${ip}auth/login`,
        body: `"${body}"`,
        headers: {
            "content-type": 'application/json'
        }
    };

    return requestPromise.put(options)
    .then(body => {
        console.log(`${body}`);
        token = JSON.parse(body)['jwt'];
        console.log(token);
        return token;
    });
}
export const helloWorldApi = (ip: string, body: any): Promise<any> => {

    console.log(token);

    const options = {
        uri: `${ip}helloworld`,
        body: body,
        headers: {
            "content-type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
    };

    return requestPromise.post(options);
}
export const getLoginTokenForUser = (ip: string, username: string, callback: (token: string) => void): Promise<any> => {

    console.log(token);

    const options = {
        uri: `${ip}auth/login/${username}`,
        headers: {
            "content-type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
    };
    return requestPromise.get(options).then(body => {
        callback(JSON.parse(body)['jwt']);
        return body;
    });
}

export const addBatch = (ip: string, entity: 'user' | 'server', batch: any[]): Promise<any> => {
    const options = {
        uri: `${ip}api/addbatch/${entity}s`,
        body: JSON.stringify(batch),
        headers: {
            "content-type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
    };
    /*batch.map(({ServerID, ServerURL, CreationDate}) => {
        /*const stamp: string = 
                    JSON.stringify(createdAt.toJSON())
        //             .replace('T', 'H')
                     .replace('Z', '');
                     zz
    })*/
    return requestPromise.post(options);
}

export const fetchAll = (ip: string, entity: string, listener?: (body: any) => (void)): Promise<any> => {

    if (!entity) return Promise.reject(`No entity argument passed.`);

    const options = {
        uri: `${ip}api/dto/${entity}`,
        headers: {
            "content-type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
    };

    return requestPromise.get(options)
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

    const options = {
        uri: `${ip}api/currency/transfer`,
        body: JSON.stringify(body),
        headers: {
            "content-type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
    }

    return requestPromise.post(options);
}

export const encode = (body: any) => jwt.encode(body, key, "RS256");

/*
https://stackoverflow.com/questions/23714383/what-are-all-the-possible-values-for-http-content-type-header

*/