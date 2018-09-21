const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js')

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hg-resim-ayarla',
			aliases: [],
			group: 'ayarlar',
			memberName: 'hg-resim-ayarla',
			description: 'Reklam engelleme özelliğini açıp/kapatmanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'string',
					prompt: 'Hoşgeldin Resmi 1 Mi 2 Mi Olsun',
					type: 'string',
					validate: string => {
						if (string === '1' || string === '2') return true;
						else return 'lütfen `aç` ya da `kapat` yazınız';
					}
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
			if (args.string === "1") {
        const vt = this.client.provider.get(msg.guild.id, 'hg1', []);
				this.client.provider.set(msg.guild.id, 'hg1', true);
        const embed = new RichEmbed()
        .setColor('RANDOM')
				.setThumbnail("https://cdn.discordapp.com/attachments/458732340491845633/473591102172168192/guildAdd.png")
        .setDescription(`Hoşgeldin Resmi 1 Olarak Belirlendi`)
        .setFooter('Hoşgeldin Mesajı Ayarlandı')
        msg.embed(embed)
			}
			if (args.string === "2") {
        const vt = this.client.provider.get(msg.guild.id, 'hg1', []);
				this.client.provider.set(msg.guild.id, 'hg1', false);
        const embed1 = new RichEmbed()
        .setColor('RANDOM')
				.setThumbnail("https://cdn.discordapp.com/attachments/475267849460645922/475270776035999752/guildAdds.png")
        .setDescription(`Hoşgeldin Resmi 2 Olarak Belirlendi.`)
        .setFooter('Hoşgeldin Mesajı Ayarlandı')
        return msg.embed(embed1)
			}
	}
};
