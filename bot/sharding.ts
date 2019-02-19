import { Discord } from "./src";
import { getOptions } from "./auth";
import "./src/resources/config";

const manager = new Discord.ShardingManager(
    "./compiled/bot.js",
    {
        totalShards: 'auto',
        token: getOptions(process).token
    }
);

manager.spawn();
manager.on('launch', setupShard);

function setupShard(shard: Discord.Shard): void {
    console.log(``)
}