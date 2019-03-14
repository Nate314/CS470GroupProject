import {Client, Message} from "discord.js";
import { authenticate, getLoginTokenForUser } from "../../../request";

export = ({message, prefix, ip}) => {
    authenticate(ip).then(_ => {
        let user;
        message.client.users.forEach(u => {
            if (u.username === message.author.username) {
                user = u;
            }
        });
        getLoginTokenForUser(ip, user.username, (token) => {
            user.sendMessage(`use this token to log in ${JSON.stringify(token)}`)
                .then(console.log)
                .catch(console.error);
        });
    });
}
