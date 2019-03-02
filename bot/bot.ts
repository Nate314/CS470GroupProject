import { Discord, EventResponse } from "./src";
import { getOptions } from "./auth";

const bot = new Discord.Client();

const {token, ip} = getOptions(process);

console.log("Before.");
for (var event in EventResponse.responses) {
    bot.on(event, EventResponse.responses[event](bot, {ip}));
}
console.log("After.");
console.log(token.replace('\'', '').replace('\'', ''));
bot.login(token.replace('\'', '').replace('\'', ''));
