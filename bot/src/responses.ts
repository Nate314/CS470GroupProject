import { Client, Message, GuildMember, User } from "discord.js";
import "./command";
import "./resources/config";
import { RichCommandManager } from "./command";
import { authenticate, helloWorldApi, fetchAll, addBatch } from "../request";
import { dateToTimestamp } from "./resources/config";

interface Dictionary<T> {
    [index: string]: T;
}

export const responses: Dictionary<(client: Client, options: any) => Function> = {
    'ready': (client: Client, options: any) => {
        return () => {
            // console.log("Shard ID:", client.shard.id);
            console.log("Ready");
            const {ip} = options;
            authenticate(ip)
             .then(_ => 
                fetchAll(ip, 'servers')
                 .then(body => {
                    const servers = client.guilds.array()
                     .map(({id, createdAt, iconURL}) => 
                        ({
                            "ServerID":                             id,
                            "CreationDate": dateToTimestamp(createdAt),
                            "ServerURL":                       iconURL,
                        })
                     )
                     .filter(x => !body.includes(x));
                    if (servers)
                        addBatch(ip, 'server', servers)
                         .catch(() => console.error(`AddBatch[server] did not complete its action.`));

                    const allServers = body.concat(servers);

                    fetchAll(ip, 'discorduserservers')
                    .then(body => {
                        console.log(body);
                        const idArr = body.map((us: Object) => us['DiscordUserID']);

                        const newUsers = client.users.array()
                             .filter(user => !idArr.includes(user.id));

                        const newUsersInfo = newUsers
                             .map(({id, username, tag, displayAvatarURL, client}) =>
                                ({
                                    'DiscordUserID':                  id,
                                    'UserName':                 username,
                                    'UserHash':           tag.substr(-4),
                                    'ProfilePicture':   displayAvatarURL,
                                    'Servers':      client.guilds.array()
                                                     .map(server => ({
                                                        'ServerID':                         server.id,
                                                        'JoinDate':  dateToTimestamp(server.joinedAt),
                                                     })
                                                    )
                                })
                        );
                        if (newUsersInfo) {
                            addBatch(ip, 'user', newUsersInfo)
                             .then(body => console.log(`Added batch of users: ${body}`))
                             .catch(console.error);
                            fetchAll(ip, 'discorduserservers')
                             .then(body => console.log(`Resultant batch of users on servers: ${body}`))
                             .catch(console.error);
                        }
                    });
                })
                 .catch(console.error)
             );
        }
    },
    'message': (client: Client, options: any) => {
        return (message: Message) => {
            console.log("Called message.");
            const {ip} = options;
            const prefix = "r?";
            if (message.author.bot || !message.content.startsWith(prefix)) return;

            const [command, ...args] = message.content.slice(prefix.length).split(' ');
            
            const manager = new RichCommandManager("./resources/commands", "./resources/index/");
            manager.launch();
            manager.execute(command,
                {
                    'client':   client,
                    'message': message,
                    'prefix':   prefix,
                    'ip':           ip,
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

/*

https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript



*/