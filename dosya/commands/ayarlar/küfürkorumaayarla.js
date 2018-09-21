const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js')

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'küfür-koruma-ayarla',
			aliases: ['küfür', 'küfürkoruma', 'küfürkoru', 'küfürayarla'],
			group: 'ayarlar',
			memberName: 'küfür-koruma-ayarla',
			description: 'Reklam engelleme özelliğini açıp/kapatmanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'string',
					prompt: 'Küfür engellensin mi?(aç ya da kapat olarak cevap yazınız)\n',
					type: 'string',
					validate: string => {
						if (string === 'aç' || string === 'kapat') return true;
						else return 'Lütfen `aç` ya da `kapat` yazınız';
					}
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
			if (args.string === "aç") {
				const vt = this.client.provider.get(msg.guild.id, 'kufurkoruma', []);
				this.client.provider.set(msg.guild.id, 'kufurkoruma', true);
        this.client.provider.set(msg.guild.id, 'açık', args.string);
        const embed = new RichEmbed()
        .setColor('RANDOM')
				.setThumbnail("https://cdn.discordapp.com/emojis/452943572845723648.png?v=1")
        .setDescription(`Küfür Engelleme: **Acildi**.`)
        .setFooter('Küfür Engelleme Ayarlandı.')
        msg.embed(embed)
			}
			if (args.string === "kapat") {
				const vt = this.client.provider.get(msg.guild.id, 'kufurkoruma', []);
				this.client.provider.set(msg.guild.id, 'kufurkoruma', false);
        this.client.provider.set(msg.guild.id, 'kapalı', args.string);
        const embed1 = new RichEmbed()
        .setColor('RANDOM')
				.setThumbnail("https://cdn.discordapp.com/emojis/452943632438263818.png?v=1")
        .setDescription(`Küfür Engelleme: **Kapalı**.`)
        .setFooter('Küfür Engelleme Ayarlandi.')
        return msg.embed(embed1)
			}
	}
};
