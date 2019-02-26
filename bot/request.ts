import * as jwt from 'jwt-simple';
import * as request from 'request';
import * as crypt from './crypt.json';
import './src/resources/config';

const key = crypt.rsaprivatekey;
let token: string;

export const authenticate = (ip: string) => {
    const body = encode({ "E.A.": "Sports"});
    console.log(`${ip}: ${body}`);
    request.put(
        {
            uri: `${ip}auth/login`,
            body: `"${body}"`,
            headers: {
                "content-type": 'application/json'
            }
        },
        (error, response, body) => {
            if (error)
                console.error(error);
            else {
                console.log(`${response}: ${body}`);
                token = JSON.parse(body)['jwt'];
                console.log(token);
            }
        }
    )
}
export const helloWorldApi = (ip: string, body: any) => {
    console.log(token);
    request.post(
        {
            uri: `${ip}helloworld`,
            body: body,
            headers: {
                "content-type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        },
        (error, response, body) => {
            if (error)
                console.error(error);
            else {
                console.log(`${response}: ${body}`);
            }
        }
    )
}

export const encode = (body: any) => jwt.encode(body, key, "RS256");