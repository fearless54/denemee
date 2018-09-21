const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bug',
            group: 'bot',
            memberName: 'bug',
            description: 'Bot için Bug bildirirsiniz',
            args: [
                {
                    key: 'tavsiye',
                    prompt: 'Bulduğunuz Bug?',
                    type: 'string'
                }
            ]
        });
    }

async run(msg, args) {
  const embed1 = new RichEmbed()
  .setColor("RANDOM")
  .setDescription(`${msg.author.tag}, Bug bildirildi!`)

    msg.channel.send(embed1);

    const embed = new RichEmbed()
    .setColor("RANDOM")
    .setTitle(`${msg.author.tag}, Bug Bildirdi`)
    .addField(`» Kulanıcı Hakkında`, `İsim: ${msg.author.tag}\nID: ${msg.author.id}`)
    .addField('» Sunucu Hakkında', `Sunucu Ismi: ${msg.guild.name}\nSunucu ID: ${msg.guild.id}`)
    .addField("» Bug", args.tavsiye)
    .setThumbnail(msg.author.avatarURL)
    .setTimestamp()
    this.client.channels.get("492744898584248333").send(embed);
}
}
