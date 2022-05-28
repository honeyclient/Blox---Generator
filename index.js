 const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true});

const config = require('./config.json');

const chalk = require('chalk');
const disbut = require('discord-buttons')(client)
const { MessageButton, MessageActionRow } = require('discord-buttons')
const fs = require('fs');
const express = require("express")
const app = express()

app.get("/", (req, res) => {
 res.send("Starting")
})

app.listen(3000, () => {
 console.log("Project Running!")
})

client.commands = new Discord.Collection();


fs.readdir('./commands/', (err, files) => {
    if(err) throw err;

    let file = files.filter(f => f.endsWith('.js'));
    if(file.length <= 0) return console.log('There is js files in the commands folder');

    file.forEach((f) => {
        let props = require(`./commands/${f}`);
        console.log(chalk.yellow(`Attempting to load ${f}`));

        client.commands.set(props.help.name, props);
    });
    console.log(chalk.bold.bgGreen('Blox - Generator'));
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

client.on('error', () => console.error);

client.on('warn', () => console.warn);

client.on("ready", async () => {

    console.log(`${client.user.username} is online.`);

    client.user.setActivity(`.help | Blox Generator`, { type: 'PLAYING', url: "https" });
    

     console.log(`Ready to server in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
});


client.on('message', async (msg) => {
    if(msg.author.bot) return;
    if(!msg.content.startsWith(config.PREFIX)) return;
    if(msg.content.indexOf(config.PREFIX) != 0) return;
    if(msg.channel.type == 'dm') return;

    const args = msg.content.slice(config.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, msg, args, config);
});

client.login(config.TOKEN); 