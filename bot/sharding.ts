import { Discord } from "./src";
import { getOptions } from "./auth";
import "./src/resources/config";

console.log(`INSIDE sharding.ts`);

const manager = new Discord.ShardingManager(
    "./compiled/bot.js",
    {
        totalShards: 'auto',
        shardArgs: process.argv.slice(2),
        token: getOptions(process).token
    }
);

manager.spawn();
manager.on('launch', setupShard);

function setupShard(shard: Discord.Shard): void {
    console.log(`INSIDE setupShard`);
}
