const Discord = require ("discord.js")

exports.run = async (client, message) => {
  let embed = new Discord.MessageEmbed()
	.setColor('#8A2BE2')
	.setTitle('BLOX - Generator')
	.setURL('https://dsc.gg/synapsex')
	.setAuthor('Rose', 'https://media.discordapp.net/attachments/977414561584001064/978393853990170664/7c79e4aff1522b6772b51fd0b1115df2.png')
	.setDescription('Commands: Soon')
	.setThumbnail('https://media.discordapp.net/attachments/977414561584001064/978393853990170664/7c79e4aff1522b6772b51fd0b1115df2.png')
	.setTimestamp()
	.setFooter('BLOX - Generator');

message.channel.send(embed);
}
module.exports.help = {
  name: 'help'
}
