import { Discord, EventResponse } from "./src";
import { GatewayIntentBits } from "discord.js";
import { getOptions } from "./auth";

const bot = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const options = getOptions(process);
const { token } = options;

console.log("Before.");
for (var event in EventResponse.responses) {
    bot.on(event, EventResponse.responses[event](bot, options));
}
console.log("After.");

bot.login(token);
