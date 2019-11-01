const { Listener } = require('discord-akairo');
const infoEmbed = require('../utils/infoEmbed.js');
class CommandBlockedListener extends Listener {
    constructor() {
        super('commandBlocked', {
            emitter: 'commandHandler',
            eventName: 'commandBlocked'
        });
    }

    exec(message, command, reason) {
        switch(reason) {
            case "userPermissions":
                return message.channel.send(infoEmbed(message.author, `Il vous manque la permission **${command.clientPermissions}**.`,this.client.config.colors.RED))
        }
    }
}

module.exports = CommandBlockedListener;