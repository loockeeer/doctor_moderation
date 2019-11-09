const { Listener } = require('discord-akairo');

const { RichEmbed } = require('discord.js');

const db = require('../utils/graphQLConnect.js');

class CustomKickListener extends Listener {
    constructor() {
        super('custom-kick', {
            emitter: 'client',
            eventName: 'custom-kick'
        });
    }

    exec(target, mod, message, reason) {
        const embed = new RichEmbed()
            .setAuthor('Kick', mod.user.displayAvatarURL)
            .setThumbnail(target.user.displayAvatarURL)
            .addField('Modérateur', mod.user.tag,true)
            .addField('Cible', target.user.tag, true)
            .addField('Raison', reason ? reason : 'Aucune', true)
            .setTimestamp()
            .setColor(this.client.config.colors.RED)
        const logEmbed = new RichEmbed()
            .setAuthor(target.user.tag, target.user.displayAvatarURL)
            .addField('Action', 'Kick', true)
            .addField('Modérateur', mod.user.tag, true)
            .addField('Raison', reason ? reason : 'Aucune', true)
            .setTimestamp()
            .setColor(this.client.config.colors.RED)
        target.createDM().then(channel=>{
            channel.send(embed).then(()=>{
                target.kick(reason)
            }).catch(()=>target.kick(reason))
        }).catch(()=>target.kick(reason))
        this.client.channels.get(this.client.config.channels.MOD_LOG).send(logEmbed)
        if(mod.user.id !== this.client.user.id) {
            message.channel.send(embed)
        }
        // Query to API
        if(target.user.bot) return;
        db.query(`
mutation {
  createKick(input: {kick: {createdAt: "${Date.now()}", targetId: "${target.user.id}", moderatorId: "${mod.user.id}", reason: "${reason || ''}"}}) {
    clientMutationId
  }
}
        `)
    }
}

module.exports = CustomKickListener;