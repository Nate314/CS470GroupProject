import { Client, Message } from "discord.js";
import "./command";
import "./resources/config";
import { RichCommandManager } from "./command";

interface Dictionary<T> {
    [index: string]: T;
}

export const responses: Dictionary<(client: Client) => Function> = {
    'ready': (client) => {
        return () => {
            console.log("The Zucc:", client.shard.id);
        }
    },
    'message': (client) => {
        return (message: Message) => {
            const prefix = "r?";
            if (message.author.bot || !message.content.startsWith(prefix)) return;

            const [command, ...args] = message.content.slice(prefix.length).split(' ');
            
            const manager = new RichCommandManager("./resources/commands", "./resources/index/");
            manager.launch();
            manager.execute(command,
                {
                    'client': client,
                    'message': message,
                    'prefix': prefix
                }
            );
        }
    },
    'error': (client) => {
        return (error: Error) => {
        
        }
    },

};