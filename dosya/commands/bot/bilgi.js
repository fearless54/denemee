const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags');
require('moment-duration-format');

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bilgi',
			aliases: ['b', 'info', 'bot info', 'botinfo'],
			group: 'bot',
			memberName: 'bilgi',
			description: 'Bot ile ilgili bilgi verir.',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	async run(msg) {
		const embed = new RichEmbed()
		.setColor("RANDOM")
		.setDescription('Bilgi')
		.addField(`Yapımcı :<@472574417843519498>`, `Dragons Bot`, false)
		.addField('Sürüm', `1.0`, false)
		.addField('Davet', '[Devet İçin Tıkla(Kapalı)](https://Ayarlanmamış)', false)
		.addField('Destek sunucusu', '[Girmek İçin Tıkla(Kapalı)](https://Ayarlanmamış)', false)
		.setFooter('Dragons Bot')
		.setThumbnail(this.client.user.avatarURL)
		.setTimestamp()
		return msg.channel.send(embed);
	}
};
