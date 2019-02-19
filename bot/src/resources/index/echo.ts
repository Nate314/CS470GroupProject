import {Client, Message} from "discord.js";
export = ({message, prefix}) => {
    const res = message.content.substr(`${prefix}echo`.length);
    return message.channel.send(res)
     .then(console.log)
     .catch(console.error);
}