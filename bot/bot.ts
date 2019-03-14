import { Discord, EventResponse } from "./src";
import { getOptions } from "./auth";

const bot = new Discord.Client();

const options = getOptions(process);
const { token } = options;

console.log("Before.");
for (var event in EventResponse.responses) {
    bot.on(event, EventResponse.responses[event](bot, options));
}
console.log("After.");
console.log(token);

bot.login(token);
