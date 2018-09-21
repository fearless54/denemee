const {Command} = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const snekfetch = require("snekfetch");
const talkedRecently = new Set();

module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'partnerol',
            group: 'bot',
            memberName: 'partnerol',
            description: 'Bot için tavsiye bildirirsiniz',
            args: [
                {
                    key: 'mesaj',
                    prompt: 'Bırakmak İstediğiniz Mesaj?',
                    type: 'string'
                },
            ]
        });
    }
      hasPermission(msg) {
		if(!msg.guild) return this.client.isOwner(msg.author);
		return this.client.isOwner(msg.author) || msg.member.hasPermission('ADMINISTRATOR');
    }

async run(msg, args, client, message) {
msg.guild.channels.get(msg.guild.channels.filter(c => c.type === "text").random().id).createInvite({maxAge: 0}).then((invite) => {

  if (talkedRecently.has(msg.author.id)) {
          return msg.channel.send("Tekrar Sunucunu Tanıtman İçin `24` Saat Beklemelisin.");
  } else {

    const embed1 = new RichEmbed()
		.setColor("RANDOM")
		.setDescription(`Sunucunuz Destek Suncumuzda Reklamı Yapılmıştır. [Girmek İçin Tıkla](https://Ayarlanmamış)`)
		msg.channel.send(embed1)

    const embed = new RichEmbed()
    .setColor('RANDOM')
    .setTitle(`${msg.author.tag} Adlı Kişi Sunucu Reklamı Yaptı\n`)
    .addField(`» Sunucu Link`, `[Tıkla](${invite.url})`)
    .addField(`» Kişi Sayısı`, msg.guild.memberCount)
    .addField("» mesaj", args.mesaj)
    .setThumbnail(msg.guild.iconURL)
    .setTimestamp()
    this.client.channels.get("486757006179434506").send(embed);

    talkedRecently.add(msg.author.id);
        setTimeout(() => {

          talkedRecently.delete(msg.author.id);
        }, 86400000);
    }
  })
}
}
