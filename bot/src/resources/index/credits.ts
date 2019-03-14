import { fetchAll } from "../../../request";


export = ({message, prefix, ip}) => {
    //let [command, ...discard] = message.cleanContent.split(' ');
    const receiver = message.mentions.users.first() || message.author;
    fetchAll(ip, 'discordusers')
    .then(body => {
        const [userInfo, ...discard] = body.filter(user => user["DiscordUserID"] === receiver.id);
        const amount = userInfo["Currency"];
        message.channel.send(`${receiver} has ${amount} credits!`);
    })
    .catch(error => {
        console.error(error);
        message.channel.send("Uh-oh! There seems to be a problem on our side. Please contact the development team directly or on the support server.");
    });
}