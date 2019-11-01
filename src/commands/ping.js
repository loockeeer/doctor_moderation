const { Command } = require('discord-akairo');
const infoEmbed = require('../utils/infoEmbed.js');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            description: 'Pong !'
        });
    }

    exec(message) {
        message.channel.send(infoEmbed(message.author, `Pong ! \`${this.client.ping}\` ms.`));
    }
}

module.exports = PingCommand;