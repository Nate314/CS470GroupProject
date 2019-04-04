import "../config";
import {default as humanInterval} from "human-interval";
import { Message, Channel } from "discord.js";
import { addRaffle, addToRaffle, removeRaffle, getRafflesByNumber } from "../../../request";
import { Discord } from "../..";
import { statusCodes, pluralist, confirm } from "../config";

export = ({message, prefix, ip}) => {
    let [_, ...args] = message.content.split(' ');
    let collected: string = args.join(' ');
    const sender = message.author;
    const server = message.guild;
    if (!collected) {
        message.channel.send("Uh-oh! It looks like you didn't give me a command.");
        return;
    }
    console.log(args);
    let action: string;
    [ action, ...args ] = args;
    console.log(args);
    switch (action.toLowerCase()) {
        case 'create': case 'start':
            try {
                let [amount, ...name] = args;
                amount = parseInt(amount);
                console.log("line 26 passed");
                if (!amount) {
                    message.channel.send(`Uh-oh! You cannot ${action} a raffle if you use no credits.`);
                    return
                }
                if (!name.length) {
                    message.channel.send(`Uh-oh! You cannot ${action} a raffle without a name.`);
                    return;
                }
                name = name.join(' ');
                console.log("line 35 passed");
                let millis: number = 0;
                let parsedUnits: String = "";
                if (confirm("Would you like to set a deadline for this raffle?", message)) {
                    message.channel.send("Please send an amount of time for your raffle to complete. This operation will cancel automatically in 30 seconds and your raffle can only end manually.")
                    let millis: number;
                    message.channel.awaitMessages(
                        m => {
                            if (m.author !== sender) return false;
                            try {
                                if (!millis) {
                                    millis = humanInterval(m.content);
                                    parsedUnits = m.content;
                                }
                                console.log(`human`)
                                return true;
                            } catch {
                                console.log("Didn't work.")
                                return false;
                            }
                        },
                        {
                            time: 30000,
                            errors: [ 'time' ],
                        }
                    )
                    .then(_ => _)
                    .then(messageCollection => {
                        const duration = millis;
                        console.log(`Duration: ${duration}`);
                        addRaffle(ip, name, sender, server, amount, duration)
                        .then(_ => {
                            message.channel.send({
                                embed: {
                                    title: `[Testing] Duration: ${duration} millis.`
                                }
                            });
                        })
                        .catch(error => {
                            //error codes
                            console.error(error);
                        })
                    })
                    .catch(_ => {
                        message.channel.send("Your transaction has been cancelled.");
                    });
                    
                } else {
                    addRaffle(ip, name, sender, server, amount, -1)
                    .then(response => {
                        console.log(response)
                        message.channel.send({
                            embed: {
                                title: `[Testing] Duration: no end date.`
                            }
                        })
                    })
                    .catch(error => {
                        console.error(error);
                    });
                }
            } catch {
                console.log("Line 85");
                message.channel.send(`Uh-oh! You called **${action}** on raffle, but it doesn't seem to be in the right format.`);
            }
            break
        case 'add':
            try {
                let [amount, ...name] = args;
                amount = parseInt(amount);
                if (!amount) {
                    message.channel.send(`Uh-oh! You cannot ${action} to a raffle if you use no credits.`);
                    return
                }
                if (!name.length) {
                    message.channel.send(`Uh-oh! You cannot ${action} to a raffle without a name.`);
                    return;
                }

                name = name.join(' ');
                console.log("Got here.");
                addToRaffle(ip, sender, server, amount, name)
                .then(_ => {
                    message.channel.send({
                        embed: {
                            title: `${sender.username} added ${amount} credits to ${name}`
                        }
                    })
                })
                .catch(error => {
                    const { statusCode } = error;
                    switch (statusCode) {
                        case statusCodes.NOT_FOUND:
                            message.channel.send(`There is no open raffle with the name \`${name}\`.`);
                            break
                        case statusCodes.IM_A_TEAPOT:
                            message.channel.send(`Uh-oh! You don't have enough to use ${amount} credit${pluralist(amount)} here.`)
                            break
                        default:
                            message.channel.send("Uh-oh! There seems to be a problem on our side. Please contact the development team directly or on the support server.");
                    }
                });
            } catch {
                message.channel.send(`Uh-oh! You called **${action}** on raffle, but it doesn't seem to be in the right format.`);
            }
            break
        case 'end':
            if (!args.length) {
                message.channel.send("Uh-oh! You cannot end a raffle without a name.");
                return;
            }
            const name = args.join(' ');
            removeRaffle(ip, sender, server, name)
            .then(response => {
                const { Winner, RaffleInfo } = Object(response);
                const { Raffle, DiscordUsers } = Object(RaffleInfo);
                const { Currency, Name } = Object(Raffle);
                const numParticipants = Object(DiscordUsers).length;
                const { UserName, UserHash, DiscordUserID } = Object(Winner);

                message.channel.send({
                    embed: {
                        color: 0xff00ff,
                        title: `Completed Raffle | ${Name}`,
                        description: `${(UserName + '#' + UserHash)} won the raffle and has gained ${Currency} credits! ${numParticipants} participants in this raffle.`
                    }
                })
            })
            .catch(error => {
                if (error.statusCode === 404) {
                    message.channel.send(`Uh-oh! There are no open raffles with the name ${name}`);
                } else if (error.statusCode === 403) {
                    message.channel.send("Uh-oh! You don't have permission to end the specified raffle.");
                } else {
                    message.channel.send(`Uh-oh! There seems to be a problem on our side. Please contact the development team directly or on the support server. (Code ${error.statusCode}`);
                }
                console.error(error)
            });
            break
        case 'list':
            const rafflesFetched = getRafflesByNumber(ip, server.id, 'server')
            .then(response => {
                if (!response) {
                    message.channel.send({
                        embed: {
                            title: `Open raffles | Queried by ${sender}`,
                            description: "None found"
                        }
                    });
                    return;
                }
                const raffles = response.map(raffleInfo => {
                    const { Raffle, DiscordUsers } = Object(raffleInfo);
                    const { Name, Currency, DiscordUserID, EndTime } = Object(Raffle);
                    const numParticipants = DiscordUsers.length;

                    return {
                        name: `Name: ${Name} | by ID: ${DiscordUserID}`,
                        value: `Pool: ${Currency}\nParticipants: ${numParticipants}\nEnds in: ${EndTime}`
                    }
                });
                message.channel.send({
                    embed: {
                        title: `Open raffles | Queried by ${sender.tag}`,
                        fields: raffles,
                    }
                })
                return response;
            })
            .catch(error => {
                const { statusCode } = error;
                if (statusCode === 404) {
                    message.channel.send("Uh-oh! It looks like there are no open raffles on this server right now.");
                } else {
                    message.channel.send("Uh-oh! There seems to be a problem on our side. Please contact the development team directly or on the support server.");
                }
            });
            break
        case 'info':
            const raffleName = args.join(' ');

            if (!raffleName.length) {
                message.channel.send("Uh-oh! It looks like you didn't give me a raffle to look for.");
                return
            }
            getRafflesByNumber(ip, server.id, 'server')
            .then((response: any[]) => {
                console.log(response)
                let [ raffleInfo ] = response.filter(item => {
                    const raffle = item['Raffle'];
                    const name = raffle['Name'];
                    
                    return name.toLowerCase() === raffleName.toLowerCase();
                    // return Name.includes(raffleName);
                    
                });

                if (!raffleInfo) {
                    message.channel.send(`There are no open raffles named: ${raffleName}`);
                    return;
                }

                console.log(raffleInfo)

                const { Raffle, DiscordUsers } = Object(raffleInfo);
                const { Name, Currency, DiscordUserID, EndTime } = Object(Raffle);
                const numParticipants = Object(DiscordUsers).length;
                
                message.channel.send({
                    embed: {
                    title: `Name: ${Name} | by ID: ${DiscordUserID}`,
                    description: `Pool: ${Currency}\nParticipants: ${numParticipants}\nEnds in: ${EndTime}`
                    }
                });
            })
            .catch(error => {
                console.log(error);
                const { statusCode } = error;
                if (statusCode === 404) {
                    message.channel.send("Uh-oh! It looks like there are no open raffles on this server right now.");
                } else {
                    message.channel.send("Uh-oh! There seems to be a problem on our side. Please contact the development team directly or on the support server.");
                }
            });

            break
        default:
            message.channel.send("Uh-oh! It looks like your command wasn't recognised. Here's a list of raffle commands that you can use!\n```start\nadd\nend\nlist\ninfo```")
    }
}