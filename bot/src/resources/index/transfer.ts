import { Message, User } from "discord.js";
import { defaults } from "../config";
import { transferCurrency } from "../../../request";

import { pluralist } from "../config";

export = ({message, prefix, ip}) => {
    const sender: User = message.author;
    const receiver: User = message.mentions.users.first();
    if (sender.id === receiver.id) {
        message.channel.send("Hey, you can't transfer credits to yourself!");
        return;
    }
    const messageDate = message.createdAt;
    let [command, mention, amount, ...discard] = message.cleanContent.split(' ');
    try {
        amount = parseInt(amount);
        if (!amount) {
            message.channel.send("Uh-oh! Transferring no credits wouldn't do very much, would it?");
            return;
        }
        transferCurrency(ip, receiver, sender, amount)
         .then(_ => {
             message.channel.send(`${sender} transferred ${amount} credit${pluralist(amount)} to ${receiver}!`);
         })
         .catch(error => {
             if (error.statusCode === 416) {
                 message.channel.send("Hey! You can't transfer a negative amount.");
             }
         })
    } catch {
        message.channel.send(`Uh-oh! It looks like your transfer couldn't go through. It's probably in the wrong format. Here's an example: \`\`\`${prefix}transfer @exampleUser#0001 5000\`\`\``);
    }
}