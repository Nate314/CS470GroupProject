import { Discord, EventResponse } from "./src";
import { getOptions } from "./auth";

const bot = new Discord.Client();

for (const event in EventResponse.responses) {
    bot.on(event, EventResponse.responses[event](bot));
}

const {token} = getOptions(process);

bot.login();