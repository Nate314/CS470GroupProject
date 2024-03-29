import { Message, User } from "discord.js";
import { defaults } from "../config";
import { transferCurrency, fetchAll } from "../../../request";

import { pluralist } from "../config";
import { defaultCipherList } from "constants";

export = ({message, prefix, ip}) => {
    const sender: User = message.author;
    const receiver: User = message.mentions.users.first() || message.author;
    const messageDate = message.createdAt;
    const { dailyCurrency } = defaults;
    
    transferCurrency(ip, sender, {}, dailyCurrency)
    .then(_ => {
        transferCurrency(ip, receiver, sender, dailyCurrency)
        .then(_ =>
            message.channel.send(`${receiver} received ${dailyCurrency} credits!`)
        )
        .catch(_ =>
            message.channel.send(`Uh-oh! I couldn't send it to the desired user. Instead you've received ${dailyCurrency} credits!`)
        );
    })
    .catch(error => {
        let body = parseInt(error.error);
        console.log(body);
        body /= 1000;
        let hours = Math.floor(body / 3600);
        let minutes = Math.floor(body % 3600 / 60);
        let seconds = body % 60;
        const date = `${hours} hour${pluralist(hours)}, ${minutes} minute${pluralist(minutes)} and ${seconds} second${pluralist(seconds)}`;
        console.log(date);
        message.channel.send(`Uh-oh! You'll need to wait ${date} until your next daily.`);
    });
}