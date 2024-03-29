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
        if (!options['uri'].includes('auth')) {
            authenticate(globalIP);
        }
        return requestMethod(options);
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

    public static delete(uri: string, body: any) {
        return HttpClient.requestWithAuthentication(requestPromise.delete, this.getOptions(uri, body));
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

export const getRafflesByNumber = (ip: string, discriminator: string | number, type: 'discorduser' | 'server') => {
   return HttpClient.get(`${ip}api/raffles/${type}.${discriminator}`)
   .then(JSON.parse);
}

export const addToRaffle = (ip: string, sender: User, server: Server, amount: number, name: string) => {
    return HttpClient.put(
        `${ip}api/raffles`,
        JSON.stringify({
            DiscordUserID: sender.id,
            ServerID: server.id,
            Amount: amount,
            Raffle: name,
        })
    );
}

export const addRaffle = (ip: string, name: string, sender: User, server: Server, amount: number, duration: number) => {
    let body = {
        Name: name,
        DiscordUserID: sender.id,
        ServerID: server.id,
        SeedAmount: amount,
    }
    if (duration) body['Duration'] = duration;
    return HttpClient.post(`${ip}api/raffles`, JSON.stringify(body));
}

export const removeRaffle = (ip: string, sender: User, server: Server, raffle: string) => {
    return HttpClient.delete(
        `${ip}api/raffles`,
        JSON.stringify({
            DiscordUserID: sender.id,
            ServerID: server.id,
            Raffle: raffle,
        })
    ).then(JSON.parse);
}

export const purchaseCollectible = (ip: string, sender: User, name: string) => {
    return HttpClient.post(
        `${ip}api/collectibles/purchase`,
        JSON.stringify({
            DiscordUserID: sender.id,
            CollectibleName: name,
        })
    ).then(JSON.parse);
}

export const getUserCollectibles = (ip: string, user: User) => {
    return HttpClient.get(
        `${ip}api/collectibles/user.${user.id}`
    ).then(JSON.parse);
}

export const getSocial = (ip: string) => {
    return HttpClient.get(`${ip}api/social`).then(JSON.parse);
}

export const getSocialByUser = (ip: string, sender: User, social?: string | undefined) => {
    if (social) social = social[0].toUpperCase() + social.substr(1).toLowerCase();
    return HttpClient.get(`${ip}api/social/${sender.id}${social ? '.' + social : ''}`).then(JSON.parse);
}

export const addSocial = (ip: string, sender: User, platform: string, link: string) => {
    if (platform) platform = platform[0].toUpperCase() + platform.substr(1).toLowerCase();
    const body = {
        DiscordUserID: sender.id,
        Platform: platform,
        Link: link
    }
    return HttpClient.post(`${ip}api/social`, JSON.stringify(body)).then(JSON.parse);
}

export const removeSocial = (ip: string, sender: User, social: string) => {
    if (social) social = social[0].toUpperCase() + social.substr(1).toLowerCase();
    return HttpClient.delete(`${ip}api/social/${sender.id}${social ? '.' + social : ''}`, "").then(JSON.parse);
}

export const getProfileLink = (ip: string, user: User) => {
    return HttpClient.get(`${ip}api/profile/${user.id}`).then(JSON.parse);
}

export const encode = (body: any) => jwt.encode(body, key, "RS256");

/*
https://stackoverflow.com/questions/23714383/what-are-all-the-possible-values-for-http-content-type-header

*/