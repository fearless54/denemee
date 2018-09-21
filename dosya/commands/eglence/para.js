const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class YazCommand extends Command {
    constructor(client){
        super(client, {
            name: 'para',
            group: 'eglence',
            memberName: 'para',
            description: 'Paranızı/bakiyenizi gösterir.',

            args: [
              {
                key: 'member',
                prompt: 'Kimin bakiyesini görmek istiyorsun?',
                type: 'member'
              }
            ]
        })
    }


    run(message, args) {
      const member = args.member;
      const user = member.user;

      const kasa = this.client.provider.get(user.id, 'paraKasa', []);
      const eskikasano = Number(kasa);
      const kasano = parseInt(eskikasano);
      this.client.provider.set(user.id, 'paraKasa', kasano);

      if (!kasano) return message.channel.send('Bu kullanıcının hiç Better Coin\'i bulunmuyor.');
      if (kasano < 1) return message.channel.send(`Bu kullanıcının hiç Better Coin'i yok!`)

      const embed = new RichEmbed()
      .setColor("RANDOM")
      .setAuthor(`${user.username} | Bakiye Bilgisi`)
      .setDescription(`**Para:** ${kasano} Dragons Bot Coin`)
      message.channel.send(embed)
    }
}
