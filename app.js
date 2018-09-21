const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const { RichEmbed } = require('discord.js')
const Discord = require('discord.js');
path = require('path'),
moment = require('moment'),
sqlite = require('sqlite');
const Jimp = require('jimp')
const fs = require('fs')
const hook = new Discord.WebhookClient('492744967903641600', 'RAncQ72oSC2Z66f0POB6WtUXIpkC3HeNnf-OQfDur64JKvjZCi-V48U7fK5ajRl0hGPQ');
const ayarlar = require('./dosya/veriler/botayarlar.json');
let prefix = ayarlar.prefix

const client = new CommandoClient({
    commandPrefix: ayarlar.prefix,
    unknownCommandResponse: false,
    owner: ayarlar.owner,
    disableEveryone: false
});

var antispam = require("anti-spam"); //anti-spam modulu inili diyilse indiriniz

antispam(client, {
  warnBuffer: 3,  //Uyarma sayısı
  interval: 2000, //Zaman aralığı Burada 1000 = 1 saniye olarak geçiyor. 2000 yaparsanız = 2 saniye olarak okunucaktır.
  warningMessage: "Lütfen spam yapmayın.", //Uyarı mesajı
  roleMessage: "Spam yaptığınız için susturuldunuz.", //Susturulunca gönderilen Mesaj.
  roleName: "Muted", //Rol ismi
  maxDuplicatesWarning: 5, //Kaç uyarıda mute atılsın?
  maxDuplicatesBan: 50, //Kaç uyarıda banlansın?
  time: 15, //Kullanıcı kaç dakika muteli kalsın?
}); //Kulanmak İstemiyorsanoz silebilirsiniz

client.on('message', async message => {
    if (message.content.toLowerCase() === prefix + 'döviz') {
var request = require('request');
request('https://www.doviz.com/api/v1/currencies/USD/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {
        var info = JSON.parse(body);
request('https://www.doviz.com/api/v1/currencies/EUR/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {
        var euro = JSON.parse(body);
      message.channel.send(new Discord.RichEmbed().setDescription(`Dolar Satış: **${info.selling}** \nDolar Alış: **${info.buying}** \n\nEuro Satış: **${euro.selling}TL** \nEuro Alış: **${euro.buying}TL**`).setColor('RANDOM').setTitle('Anlık Döviz Kurları').setFooter('NeverKnow Bot Paketi | Döviz'))    }
})
    }
})
    }
});

client.dispatcher.addInhibitor(msg => {
	const blacklist = client.provider.get('global', 'userBlacklist', []);
	if (!blacklist.includes(msg.author.id)) return false;
	msg.react('😡');
	return true;
});

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "bravery") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;
        message.channel.send("`Profil Fotoğrafınıza` Göre Ayarlıyorum. Bu Biraz Zaman Alabilir").then(m => m.delete(2000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(400, 400)
            image.greyscale()
            image.gaussian(1)
            Jimp.read("https://cdn.discordapp.com/attachments/484692865985806346/487843440864919554/image7.png", (err, avatar) => {
                avatar.resize(400, 400)
                image.composite(avatar, 0, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});

client.on("message", message => {
  if (message.channel.type === "dm") {
      if (message.author.id === client.user.id) return;
      const embed11 = new RichEmbed()
      .setColor("RANDOM")
      .setTitle('Dragons | Özelden Yazılanlar')
      .addField("» Yazan:", message.author.tag)
      .addField('» Yazılan:', message.content)
      .setFooter('Özelden Yazılanlar | Kayıt')
      .setTimestamp()
      hook.send(embed11); //hooke en bastan ayrlayınız
  }
  if (message.channel.bot) return;
});

client.on("guildMemberAdd", async member => {
const channel = client.provider.get(member.guild.id, 'girisCikis', []);
if (!channel) return;
if (member.guild.channels.get(channel) === undefined || member.guild.channels.get(channel) === null) return;
if (member.guild.channels.get(channel).type === "text") {
          const bg = await Jimp.read("https://i.hizliresim.com/AzlG97.png");
          const userimg = await Jimp.read(member.user.avatarURL);
          var font;
          if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
          else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
          else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
          await bg.print(font, 430, 170, member.user.tag);
          await userimg.resize(362, 362);
          await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
            setTimeout(function () {
              member.guild.channels.get(channel).send(new Discord.Attachment("./img/" + member.id + ".png"));
            }, 1000);
            setTimeout(function () {
              fs.unlink("./img/" + member.id + ".png");
            }, 10000);
      }
});

  client.on("guildMemberRemove", async member => {
    const channel = client.provider.get(member.guild.id, 'girisCikis', []);
    if (!channel) return;

    if (member.guild.channels.get(channel) === undefined || member.guild.channels.get(channel) === null) return;
    if (member.guild.channels.get(channel).type === "text") {
                          const bg = await Jimp.read("https://i.hizliresim.com/RD5GWG.png");
              const userimg = await Jimp.read(member.user.avatarURL);
              var font;
              if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
              else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
              else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
              await bg.print(font, 430, 170, member.user.tag);
              await userimg.resize(362, 362);
              await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
                setTimeout(function () {
                  member.guild.channels.get(channel).send(new Discord.Attachment("./img/" + member.id + ".png"));
                }, 1000);
                setTimeout(function () {
                  fs.unlink("./img/" + member.id + ".png");
                }, 10000);
          }
  });

    client.on('message', async msg => {
      const embed10 = new RichEmbed()
      .setColor("RANDOM")
      .setTitle(`${msg.member.user.tag} Bu Sunucuda Reklam Yapamazsın.`)
      .setFooter('Dragons | Küfür Koruma')
    if (!msg.guild) return;
    const veri = client.provider.get(msg.guild.id, 'reklamEngel', []);
    const veri2 = client.provider.get(msg.guild.id, 'linkEngel', []);
    if (veri ==! true) return;
    if (veri === true) {
        const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
        if (swearWords.some(word => msg.content.includes(word))) {
          try {
              if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();

                  return msg.channel.send(embed10).then(msg => msg.delete(3000));
              }
          } catch(err) {
            console.log(err);
          }
        }
    }
})

client.on('message', async msg => {
  const embed10 = new RichEmbed()
  .setColor("RANDOM")
  .setTitle(`${msg.member.user.tag} Bu Sunucuda Küfür Edemezsin`)
  .setFooter('Dragons | Küfür Koruma')
if (!msg.guild) return;
const veri = client.provider.get(msg.guild.id, 'kufurkoruma', []);
const veri2 = client.provider.get(msg.guild.id, 'kufurkoru', []);
if (veri ==! true) return;
if (veri === true) {
    const swearWords = ["amk", "aq", "Aq", "Amk", "oros", "Oros", "yarrak", "Yarrak", "amın", "yarağ", "siki", "annesiz", "oç", "Oç", "babanı", "fantezi"];
    if (swearWords.some(word => msg.content.includes(word))) {
      try {
           {
              msg.delete();
              return msg.channel.send(embed10).then(msg => msg.delete(3000));
          }
      } catch(err) {
        console.log(err);
      }
    }
}
})

client.on("message", message => {
  const diyilsin = new RichEmbed()
  .setColor("RANDOM")
  .setTitle(`Bot Yeniden Başlatılamadı`)
  .setFooter('Dragons | Sen Kurucu Diyilsin')

  const yeniden = new RichEmbed()
  .setColor("RANDOM")
  .setTitle(`Bot Yeniden Başlatıldı`)
  .setFooter('Dragons | Yeniden Başlatıldı')
  if (message.content.toLowerCase() === prefix + 'yenile') {
  if (message.author.id !== ayarlar.owner) {
    message.channel.send(diyilsin);
  } else {
    message.channel.sendMessage(yeniden).then(msg => {
    console.log(`Yeniden başlıyorum..`);
    process.exit(0);
  })
 }
}
});

client.on('guildMemberAdd', async member => {
  const veri = client.provider.get(member.guild.id, 'girisRolK', []);
  if (veri ==! true) return;
  if (veri === true) {
    const girisrolveri = client.provider.get(member.guild.id, 'girisRol', []);
    if (member.guild.roles.get(girisrolveri) === undefined || member.guild.roles.get(girisrolveri) === null) return;
    member.addRole(girisrolveri);
  }
})

client.registry
    .registerDefaultTypes()
    .registerGroups([
		['admin', 'Admin Komutları'],
    ['ayarlar', 'Ayarlar Komutları'],
    ['bot', 'Bot Komutları'],
    ['eglence', 'Eğlence Komutları'],
    ['moderasyon', 'Moderasyon Komutları'],
  ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, './dosya/commands'));

	sqlite.open(path.join(__dirname, "./dosya/veriler/kayitlar.sqlite3")).then((db) => {
		client.setProvider(new SQLiteProvider(db));
	});

client.on('ready', () => {
  client.user.setStatus('dnd');
  client.user.setActivity("Dragons", { type: "WATCHING"});
  console.log(`Bot Aktif`);
});

client.on('error', err => {
	console.log(err)
});

client.login('NDkwNTM0OTA5Mzc1NTQ1MzQ0.Doa3xQ.5RRIiKsv0kUUJG2nRFl4VoSRarc');
