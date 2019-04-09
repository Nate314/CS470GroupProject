import { fetchAll, purchaseCollectible, getUserCollectibles } from "../../../request";
import { pluralist, statusCodes } from "../config";

let lastFetched: Date;
let collectibles: any[];

const getCollectibles = (ip: string): Promise<any[]> => {
    if (!lastFetched || (new Date().valueOf() - lastFetched.valueOf()) > 300000)
        return fetchAll(ip, 'collectibles')
        .then(resp => {
            console.log(resp);
            lastFetched = new Date();
            return collectibles = resp;
        });
    return Promise.resolve(collectibles);
}

export = ({message, prefix, ip}) => {
    const sender = message.author;
    const server = message.guild;

    if (!message.content.includes(' ')) {
        message.channel.send(`Uh-oh! You didn't give me a command to run.`);
        return;
    }
    let [ _, action, ...args ] = message.content.split(' ');
    action = action.toLowerCase();
    const collected = args.join(' ');
    switch(action) {
        case 'l': case 'list':
            const receiver = message.mentions.users.first() || sender;
            getUserCollectibles(ip, receiver)
            .then(collectibles => {
                const fields = collectibles.map(collectible => {
                    const { Name, Currency } = collectible;
                    return {
                        name: `${Name}`,
                        value: `Worth ${Currency} credit${pluralist(Currency)}`
                    }
                });
                message.channel.send({
                    embed: {
                        title: `${receiver.username}'s collectibles | Number: ${fields.length}`,
                        fields: fields
                    }
                })
            })
            .catch(console.error);
            break
        case 'a': case 'avail': case 'available':
            getCollectibles(ip)
            .then(collectibles => {
                const fields = collectibles.map(collectible => {
                    const { Name, Currency } = collectible;
                    return {
                        name: `${Name}`,
                        value: `${Currency} credit${pluralist(Currency)}`
                    }
                });
                message.channel.send({
                    embed: {
                        title: `Available collectibles`,
                        fields: fields
                    }
                })
            })
            .catch(console.error);
            break
        case 'p': case 'b': case 'purchase': case 'buy':
            if (!args.length) {
                message.channel.send(`Uh-oh! You cannot ${action} a collectible without a name.`);
                return;
            }
            purchaseCollectible(ip, sender, collected)
            .then(resp => {
                message.channel.send({
                    embed: {
                        title: `Purchased collectible | by ${sender.username}`,
                        description: `You've successfully purchased the collectible \`${collected}\``
                    }
                })
            })
            .catch(error => {
                if (!error) {
                    message.channel.send(`[Testing] Problem on bot code.`);
                    return;
                } else if (error.statusCode === statusCodes.NOT_FOUND) {
                    message.channel.send(`No collectible could be found with the name ${collected}.`);
                } else if (error.statusCode === statusCodes.IM_A_TEAPOT) {
                    message.channel.send(`The collectible ${collected} could not be purchased because you do not have sufficient credits.`);
                } else if (error.statusCode === statusCodes.CONFLICT) {
                    message.channel.send(`Uh-oh! You already have this collectible. Use \`${prefix}collectibles list\` to find out what you have.`);
                }
            })
            break
        default:
        message.channel.send(`Uh-oh! I don't recognise the command ${action}. Available options are: \`\`\`\navailable\nlist\npurchase\`\`\``);
    }
}