import { fetchAll, purchaseCollectible } from "../../../request";
import { pluralist } from "../config";

let lastFetched: Date;
let collectibles: any[];

const getCollectibles = (ip: string): Promise<any[]> => {
    if (!lastFetched || (new Date().valueOf() - lastFetched.valueOf()) > 300000)
        return fetchAll(ip, 'collectibles')
        .then(resp => {
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
        case 'list':
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
        case 'purchase': case 'buy':
            if (!args.length) {
                message.channel.send(`Uh-oh! You cannot ${action} a collectible without a name.`);
                return;
            }
            purchaseCollectible(ip, sender, collected)
            .then(resp => {
                message.channel.send({
                    embed: {
                        title: `Purchased collectible | by ${sender}`,
                        description: `You've successfully purchased the collectible \`${collected}\``
                    }
                })
            })
            .catch(error => {
                if (!error) {
                    message.channel.send(`[Testing] Problem on bot code.`);
                } else if (error.statusCode) {
                    message.channel.send(`The collectible ${collected} could not be purchased.`);
                }
            })
            break
        default:
        message.channel.send(`Uh-oh! I don't recognise the command ${action}. Available options are: \`\`\`list\npurchase\`\`\``);
    }
}