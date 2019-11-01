const { Listener } = require('discord-akairo');

class GuildBanAddListener extends Listener {
    constructor() {
        super('guildBanAdd', {
            emitter: 'client',
            eventName: 'guildBanAdd'
        });
    }

    async exec(guild, user) {
        await this.client.updateGuild(true)
        console.log(`=> ${user.tag} left the server. (BAN)`);
    }
}

module.exports = GuildBanAddListener;