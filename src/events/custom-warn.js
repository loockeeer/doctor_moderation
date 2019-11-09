const { Listener } = require('discord-akairo');

const { RichEmbed } = require('discord.js');

const db = require('../utils/graphQLConnect.js');

class CustomWarnListener extends Listener {
    constructor() {
        super('custom-warn', {
            emitter: 'client',
            eventName: 'custom-warn'
        });
    }

    exec(target, mod, message, reason) {
        const embed = new RichEmbed()
            .setAuthor('Warn', mod.user.displayAvatarURL)
            .setThumbnail(target.user.displayAvatarURL)
            .addField('Modérateur', mod.user.tag,true)
            .addField('Cible', target.user.tag, true)
            .addField('Raison', reason ? reason : 'Aucune', true)
            .setTimestamp()
            .setColor(this.client.config.colors.RED)
        const logEmbed = new RichEmbed()
            .setAuthor(target.user.tag, target.user.displayAvatarURL)
            .addField('Action', 'Warn', true)
            .addField('Modérateur', mod.user.tag, true)
            .addField('Raison', reason ? reason : 'Aucune', true)
            .setTimestamp()
            .setColor(this.client.config.colors.RED)
        target.createDM().then(channel=>{
            channel.send(embed).catch(()=>{})
        })
        this.client.channels.get(this.client.config.channels.MOD_LOG).send(logEmbed)
        if(mod.user.id !== this.client.user.id) {
            message.channel.send(embed)
        }
        // Request to the databasse to warn the user
        console.log('ABADAKOR')
        db.query(`
mutation {
  createWarn(input: {warn: {createdAt: "${Date.now()}", moderatorId: "${mod.user.id}", targetId: "${target.user.id}", reason: "${reason || ''}"}}) {
    clientMutationId
  }
}
`)
    }
}

module.exports = CustomWarnListener;