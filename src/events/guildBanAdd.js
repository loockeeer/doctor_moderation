const { Listener } = require('discord-akairo');

class GuildBanAddListener extends Listener {
    constructor() {
        super('guildBanAdd', {
            emitter: 'client',
            eventName: 'guildBanAdd'
        });
    }

    async exec(guild, user) {
        console.log(`=> ${user.tag} left the server. (Banned)`);
    }
}

module.exports = GuildBanAddListener;