const { Listener } = require('discord-akairo');

const { RichEmbed } = require('discord.js');

const db = require('../utils/graphQLConnect.js');

class CustomUnbanListener extends Listener {
    constructor() {
        super('custom-unban', {
            emitter: 'client',
            eventName: 'custom-unban'
        });
    }

    exec(target, mod, reason) {
        const embed = new RichEmbed()
            .setAuthor('UnBan', mod.user.displayAvatarURL)
            .setThumbnail(target.user.displayAvatarURL)
            .addField('Modérateur', mod.user.tag,true)
            .addField('Raison', reason ? reason : "Aucune", true)
            .setTimestamp()
            .setColor(this.client.config.colors.RED);
        const logEmbed = new RichEmbed()
            .setAuthor(target.user.tag, target.user.displayAvatarURL)
            .addField('Action', 'Warn', true)
            .addField('Modérateur', mod.user.tag, true)
            .addField('Raison', reason ? reason : "Aucune", true)
            .setTimestamp()
            .setColor(this.client.config.colors.RED);
        target.createDM().then(channel=>{
            channel.send(embed).catch(()=>{})
        });
        this.client.channels.get(this.client.config.channels.MOD_LOG).send(logEmbed)
    }
}

module.exports = CustomUnbanListener;