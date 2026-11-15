import { Discord } from "./src";
import { getOptions } from "./auth";
import "./src/resources/config";

console.log(`INSIDE sharding.ts`);

const { token } = getOptions(process);
if (!token) {
    console.error('DISCORD_TOKEN is not set. Copy .env.example to .env and put the bot token there.');
    process.exit(1);
}
if (!process.env.BOT_API_TOKEN) {
    console.error('BOT_API_TOKEN is not set. See .env.example for how to generate it, and put it in .env.');
    process.exit(1);
}

const manager = new Discord.ShardingManager(
    "./compiled/bot.js",
    {
        totalShards: 'auto',
        shardArgs: process.argv.slice(2),
        token: token
    }
);

manager.spawn();
console.log(`A.`);
manager.on('shardCreate', setupShard);

function setupShard(shard: Discord.Shard): void {
    console.log(`INSIDE setupShard`);
}
