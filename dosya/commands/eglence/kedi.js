const { Command } = require('discord.js-commando');
const snekfetch = require('snekfetch');

module.exports = class CatCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kedi',
            group: 'eglence',
            memberName: 'kedi',
            description: 'Rastgele bir kedi resmi gönderir.',
            guildOnly: false,
            throttling: {
                 usages: 1,
                 duration: 5
            }
        });
    }

    async run(msg, args) {
		try {
			const { body } = await snekfetch
				.get('http://aws.random.cat/meow');
                let embed = {
                    color: 3447003,
                    description: `Dragons Bot`,
                    image: {
                        url: body.file,
                    }
                  };
                  return msg.channel.send({embed});
		} catch (err) {
			return msg.say(`Opss bir hata var galiba! \`${err.message}\`. Lütfen daha sonra tekrar dene!`);
		}
    };
};
