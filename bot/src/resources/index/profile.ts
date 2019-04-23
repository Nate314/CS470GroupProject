import { launch } from "puppeteer";
import { getProfileLink } from "../../../request";

const makeProfile = async link => {
    console.log(link);
    const path = `./bigboy-${new Date()}.png`;
    const browser = await launch({ handleSIGINT: false });
    const page = await browser.newPage();
    await page.setViewport({
        width:          600,
        height:         360,
    });
    await page.goto(link);
    setTimeout(_ => _, 3000);
    // await page.waitFor(selector => !!document.querySelector(selector), { visible: true }, 'img');
    await page.screenshot({path: path});
    // browser.close();
    return path;
}

export = ({message, prefix, ip}) => {
    const receiver = message.mentions.users.first() || message.author;
    getProfileLink(ip, receiver)
    .then(link => makeProfile(link)
        .then(imagePath => {
            message.channel.send({
                embed: {
                    title: `Profile | ${receiver.username}`,
                    image: {
                        url: imagePath,
                    },
                }
            })
        })
    )
    .catch(error => {
        message.channel.send(`[Testing] Error Code ${error.statusCode}.`);
    })
}
