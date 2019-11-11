const { Listener } = require('discord-akairo');

const { RichEmbed } = require('discord.js');

const conn = require('../utils/graphQLConnect.js');

class CustomBanListener extends Listener {
    constructor() {
        super('custom-ban', {
            emitter: 'client',
            eventName: 'custom-ban'
        });
    }

    exec(target, mod, message, reason) {
        const humanTime = reason.match(/((\d\dw)|(\d\dd)|(\d\dm)|(\d\ds))/);
        let time;

        if (humanTime) {
            reason = reason.replace(humanTime[0], '');
            switch (humanTime[0].slice(-1)) {
                case 'd':
                    time = 24 * 60000 * Number(humanTime[0].replace('d', '')) * 1000;
                    break;
                case 'w':
                    time = 7 * 24 * 60000 * Number(humanTime[0].replace('w', '')) * 1000;
                    break;
                case 'm':
                    time = 4 * 7 * 24 * 60000 * Number(humanTime[0].replace('m', '')) * 1000;
                    break;
                case 's':
                    time = Number(humanTime[0].replace('s', '')) * 1000;
                    break;
            }
        }
        const embed = new RichEmbed()
            .setAuthor('Ban', mod.user.displayAvatarURL)
            .setThumbnail(target.user.displayAvatarURL)
            .addField('Modérateur', mod.user.tag, true)
            .addField('Cible', target.user.tag, true)
            .addField('Raison', reason ? reason : 'Aucune', true)
            .addField('Durée', time ? humanTime[0].replace('d', ' jour(s)').replace('w', ' semaine(s)').replace('m', 'mois') : "Infinie", true)
            .setTimestamp()
            .setColor(this.client.config.colors.RED);
        const logEmbed = new RichEmbed()
            .setAuthor(target.user.tag, target.user.displayAvatarURL)
            .addField('Action', 'Ban', true)
            .addField('Modérateur', mod.user.tag, true)
            .addField('Raison', reason ? reason : 'Aucune', true)
            .addField('Durée', time ? humanTime[0].replace('d', ' jour(s)').replace('w', ' semaine(s)').replace('m', ' mois') : "Infinie", true)
            .setTimestamp()
            .setColor(this.client.config.colors.RED);
        if (mod.user.id !== this.client.user.id) {
            message.channel.send(embed);
        }
        //target.createDM().then(channel=>{
        //channel.send(embed).then(()=>{
        //return target.ban({reason: reason})
        //}).catch(()=>target.ban({reason: reason}))
        //}).catch(()=>target.ban({reason: reason}));
        this.client.channels.get(this.client.config.channels.MOD_LOG).send(logEmbed);

        conn.query(`
mutation {
  createBan(input: {ban: {createdAt: "${Date.now()}", targetId: "${target.user.id}", moderatorId: "${mod.user.id}", time: "${time || -1}", reason: "${reason || 'Aucune'}"}}) {
    ban {
      createdAt
    }
  }
}`).catch(console.error).then(console.log);
    }
}

module.exports = CustomBanListener;