const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js');

module.exports = class channelinfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ayarlar',
			group: 'ayarlar',
			memberName: 'ayarlar',
			description: 'Sunucudaki ayarları gösterir.',
			guildOnly: true,
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

	async run(msg) {

		const modlog = msg.guild.channels.get(msg.guild.settings.get('modLog'))
		const girisCikis = msg.guild.channels.get(msg.guild.settings.get('girisCikis'))
		const RgirisCikis = msg.guild.channels.get(msg.guild.settings.get('RgirisCikis'))
		const girisRol = msg.guild.roles.get(msg.guild.settings.get('girisRol'))
		const küfürEngel = msg.guild.settings.get('kufurkoruma')
		const girisMesaj = msg.guild.settings.get('girisM')
		const cikisMesaj = msg.guild.settings.get('girisM1')
				var b = msg.guild.settings.get('girisM')
				var b2 = msg.guild.settings.get('girisM1')

		const embed = new RichEmbed()
		.setColor("RANDOM")
		.setAuthor(`Ayarlar`, `https://lh3.googleusercontent.com/5YLxhk-dGJ1YxgYTu436Z5a3vzllrai9iIjDYD73wSH1sUznSRhoj8ezdFRZA5MXEXM=s180-rw`)
		.addField('» Mod-Log Kanalı:', modlog ? `${this.client.emojis.get('490772911909502976')} ${modlog}` : `${this.client.emojis.get('481780824170299392')} Ayarlanmamış.`, false)
		.addField(`» Giriş Çıkış Kanalı:`, girisCikis ? `${this.client.emojis.get('490772911909502976')} ${girisCikis}` : `${this.client.emojis.get('481780824170299392')} Ayarlanmamış.`, false)
		.addField(`» Otomatik Rol:`, girisRol ? `${this.client.emojis.get('490772911909502976')} ${girisRol}` : `${this.client.emojis.get('481780824170299392')} Ayarlanmamış.`, false)
		.addField(`» Küfür Engelleme Sistemi:`, küfürEngel ? `${this.client.emojis.get('490772911909502976')} Aktif!` : `${this.client.emojis.get('481780824170299392')} Deaktif!`, false)
		.setFooter(`Dragons Bot | ${msg.guild.name} Adlı Sunucu Ayarları`, this.client.user.avatarURL)
		return msg.embed(embed)

	}
}
