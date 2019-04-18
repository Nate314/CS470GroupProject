import { getSocialByUser, getSocial, addSocial } from "../../../request";
import { statusCodes } from "../config";

export = ({message, prefix, ip}) => {
    let [ _, action, ...args ] = message.content.split(' ');
    let collected: string = args.join(' ');
    const sender = message.author;
    const server = message.guild;
    if (!action) {
        message.channel.send("Uh-oh! It looks like you didn't give me a command.");
        return;
    }
    console.log(args);
    action = action.toLowerCase();
    switch(action) {
        case 'all': case 'list':
            getSocial(ip)
            .then(body => {
                const fields = body.map(platform => {
                    return {
                        name: platform.Platform,
                        value: platform.Link
                    }
                }) || undefined;
                message.channel.send({
                    embed: {
                        title: "Available platforms",
                        description: fields ? undefined : "None available at this time.",
                        fields: fields
                    }
                })
            })
            .catch(error => {
                message.channel.send(`There was a problem on our side. Please check with support. (Code ${error.statusCode}`);
            })
            break
        case 'add': case 'set':
            if (args.length < 2) {
                message.channel.send(`Uh-oh! It doesn't look like your command is in the right format. Please try again as in the example: \`\`\`${prefix}social ${action} Twitter https://twitter.com/exampleuser...\`\`\``)
                return
            }
            let [type, link] = args;
            addSocial(ip, sender, type, link)
            .then(body => {
                message.channel.send({
                    embed: {
                        title: `Successfully added account | ${sender.username}`,
                        description: `Your ${type} account has now been added to your list of accounts. Use ${prefix}social list to see your accounts.`
                    }
                })
            })
            .catch(error => {
                const {statusCode} = error;
                switch(statusCode) {
                    case 404:
                        message.channel.send(`The social media you specified is not currently supported on this bot. To see what's available, send \`\`\`${prefix}social list\`\`\``)
                    break
                    default:
                        message.channel.send(`[Testing] Internal error; code ${statusCode}.`)
                }
            })
            break
        default:
            const receiver = message.mentions.users.first();
            if (!receiver) {
                message.channel.send(`It doesn't look like your message is in the right format. Please try again.`);
                return;
            }
            let [ platform ] = args;
            getSocialByUser(ip, sender, platform)
            .then(body => {
                if (!body) {
                    message.channel.send({
                        embed: {
                            title: `Accounts | ${receiver.username}`,
                            description: "No accounts linked to this user."
                        }
                    })
                }
                for (let account of body) {
                    message.channel.send({
                        embed: {
                            image: {
                                url: account.Icon
                            },
                            title: `${account.Platform} | ${sender.username}`,
                            description: account.Link
                        }
                    })
                }
            })
            .catch(error => {
                const {statusCode} = error;
                switch(statusCode) {
                    case 404:
                        message.channel.send("Uh-oh! I could not find an account linked to this user with the specified platform.");
                    break
                    default:
                        message.channel.send(`[Testing] Internal error; code ${statusCode}.`)
                }
            })
    }

}