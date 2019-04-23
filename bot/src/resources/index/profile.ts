import { launch } from "puppeteer";
import { getProfileLink } from "../../../request";

const makeProfile = async link => {
    link = `http://136.61.166.109:4300/${link}`;
    console.log(link);
    const path = `./bigboy-${new Date().getTime()}.png`;
    const browser = await launch({ handleSIGINT: false });
    const page = await browser.newPage();
    await page.setViewport({
        width:          600,
        height:         360,
    });
    console.log('link');
    console.log(link);
    console.log('link');
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
                    files: [
                        imagePath,
                    ],
                }
            });
            // wait 10 seconds to delete the file
            setTimeout(() => {
                require('fs').unlink(imagePath, function (err) {
                    if (err) throw err;
                });
            }, 10000);
        })
    )
    .catch(error => {
        message.channel.send(`[Testing] Error Code ${error.statusCode}.`);
    })
}
