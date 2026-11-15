import './src/resources/config';
import { User, Guild as Server } from 'discord.js';

let globalIP: string;
let token: string;


class HttpClient {
    private static async request(method: string, uri: string, body?: any): Promise<string> {
        if (!uri.includes('auth')) {
            // a failed re-login is logged, the call below then answers with its own error
            await authenticate(globalIP).catch(error => console.error('Re-authentication failed:', error));
        }
        const headers = {
            "content-type": 'application/json',
        };
        if (!uri.includes('auth') || uri.includes('auth/login/')) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return fetch(uri, { method, headers, body: body || undefined })
            .then(async response => {
                const text = await response.text();
                // request-promise rejected non-2xx answers with { statusCode, error: body }, which the commands read
                if (!response.ok) throw { statusCode: response.status, error: text };
                return text;
            });
    }

    public static get(uri: string) {
        return HttpClient.request('GET', uri);
    }

    public static post(uri: string, body: any) {
        return HttpClient.request('POST', uri, body);
    }

    public static put(uri: string, body: any) {
        return HttpClient.request('PUT', uri, body);
    }

    public static delete(uri: string, body: any) {
        return HttpClient.request('DELETE', uri, body);
    }
}

export const authenticate = (ip: string): Promise<any> => {
    if (ip) globalIP = ip;
    else ip = globalIP;
    // BOT_API_TOKEN is a JWT signed with the service's JWT_SECRET (see .env.example)
    const body = JSON.stringify({token: process.env.BOT_API_TOKEN || '', username: '', password: ''});
    console.log(`${ip}auth/login`);
    return HttpClient.post(`${ip}auth/login`, body)
    .then(body => {
        token = JSON.parse(body)['jwt'];
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

/*
https://stackoverflow.com/questions/23714383/what-are-all-the-possible-values-for-http-content-type-header

*/