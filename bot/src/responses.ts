import { Client, Message } from "discord.js";
import "./command";
import "./resources/config";
import { RichCommandManager } from "./command";
import { authenticate, helloWorldApi } from "../request";

interface Dictionary<T> {
    [index: string]: T;
}

export const responses: Dictionary<(client: Client, options: any) => Function> = {
    'ready': (client: Client, options: any) => {
        return () => {
            console.log("Shard ID:", client.shard.id);
            authenticate(options.ip);
        }
    },
    'message': (client: Client, options: any) => {
        return (message: Message) => {
            console.log("Called message.");
            helloWorldApi(options.ip, `"someb0DY ONCE"`);
            const prefix = "r?";
            if (message.author.bot || !message.content.startsWith(prefix)) return;

            const [command, ...args] = message.content.slice(prefix.length).split(' ');
            
            const manager = new RichCommandManager("./resources/commands", "./resources/index/");
            manager.launch();
            manager.execute(command,
                {
                    'client': client,
                    'message': message,
                    'prefix': prefix,
                }
            );
        }
    },
    'error': (client: Client, options: any) => {
        return (error: Error) => {
            console.error(error);
        }
    },

};