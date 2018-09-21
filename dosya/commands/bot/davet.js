const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js');
let kurucu = `472574417843519498`

module.exports = class channelinfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'davet',
			group: 'bot',
			memberName: 'davet',
			description: 'Botun Davet Linkini Gösterir.',
			guildOnly: true,
		});
	}

	async run(msg ,client) {

    const embed1 = new RichEmbed()
    .setColor('RANDOM')
    .setThumbnail(client.avatarURL)
    .setTitle('Bot Sahibi: ' + kurucu)
    .addField('» Davet Linki', `[Beni sunucuna eklemek için tıkla!(Kapalı)](https://Ayarlanmamış)`, true)
    .setFooter('Dragons Bot')
    return msg.embed(embed1)

	}
}
