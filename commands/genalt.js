const Discord = require('discord.js');
const fs = require('fs');
const cooldown = new Set();

module.exports.run = async (client, msg, args, config) => {
    if(cooldown.has(msg.author.id)) {
        msg.reply(`You need to wait ${config.COOLDOWN} minutes to use this command again!`)
            .then((m) => {
                msg.delete();

                setTimeout(() => {
                    m.delete();
                }, 5000000);
            });
    } else {
        fs.readFile('./accounts/roblox.txt', 'utf8', function(err, data) {
            if (err) throw err;

            data = data + '';
            var lines = data.split('\n');
            let account = lines[Math.floor(Math.random() * 1)];

            fs.writeFile('./accounts/roblox.txt', lines.slice(1).join('\n'), function(err) {
                if(err) throw err;
            });

            let embed = new Discord.MessageEmbed()
            .addField('Account Generated!', `Blox Generator`)
            .addField('Account:',`\n**${account}**`)
            .setColor("#8A2BE2")
            .setFooter('Account Type: Roblox')
            .setTimestamp();

            msg.author.send(embed);

var xd = new Discord.MessageEmbed()
        .setColor("#8A2BE2")
        .setTitle("BLOX - Generator")
      
        .setThumbnail("https://media.discordapp.net/attachments/977414561584001064/978393853990170664/7c79e4aff1522b6772b51fd0b1115df2.png")
        .setFooter("BLOX")
        .setTimestamp()
        .setDescription("Sent Account")

                
msg.reply(xd).then(m => {
                    setTimeout(() => {
                    }, 900000);
                });

	
            cooldown.add(msg.author.id);
            setTimeout(() => {
                cooldown.delete(msg.author.id);
            }, config.COOLDOWN * 60 * 1000);
		});
    }
};
module.exports.help = {
    name: `roblox`,
    description: `Sends you a Roblox Account!`
};