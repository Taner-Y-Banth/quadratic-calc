import Discord from 'discord.js';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
const prefix = '-'
const bot = new Discord.Client();
const token = argv.token
console.log(argv.token);
bot.login(token);

bot.on('message', async (msg) => {
    //if our message doesnt start with our defined prefix, dont go any further into function
    if (!msg.content.startsWith(prefix)) {
        return
    }

    //slices off prefix from our message, then trims extra whitespace, then returns our array of words from the message
    const args = msg.content.slice(prefix.length).trim().split(' ');

    //splits off the first word from the array, which will be our command
    const command = args.shift().toLowerCase();

    const message = args.join(' ');
    const abc = message.split(",");

    let a = Number(abc[0]);
    let b = Number(abc[1]);
    let c = Number(abc[2]);

    const quadraticCalc = (a, b, c) => {
        if (c) {
            let sqrt = ((b ** 2) - 4 * a * c)
            if (sqrt >= 0) {
                let addition = ((b * -1) + sqrt ** (1 / 2)) / (2 * a)
                let subtraction = ((b * -1) - sqrt ** (1 / 2)) / (2 * a)

                return [addition, subtraction]
            } else {
                let x = b * -1
                let z = (2 * a)
                let sqrtPos = -1 * sqrt
                let addition = "(" + x + "+i*(" + sqrtPos + ")^1/2 / " + z + ")"
                let subtraction = "(" + x + "-i*(" + sqrtPos + ")^1/2 / " + z + ")"
                return [addition, subtraction]
            }
        } else {
            console.log('err')
            return
        }
    }

    const secondsCalc = (message) => {
        let secondsNum = Number(message)
        let days = secondsNum / 86400
        let remainder = secondsNum % 86400
        let hours = remainder / 3600
        let remainderHours = remainder % 3600
        let minutes = remainderHours / 60
        let seconds = remainderHours % 60
        return [days.toFixed([0]) + ":" + hours.toFixed([0]) + ":" + minutes.toFixed([0]) + ":" + seconds]
    };

    if (command === 'calc') {
        if (quadraticCalc(a, b, c)) {
            msg.reply(quadraticCalc(a, b, c));
            console.log(a, b, c);
        }
    }
    if (command === 'seconds') {
        msg.reply(secondsCalc(message));
    }
});
