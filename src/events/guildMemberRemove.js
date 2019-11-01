const { Listener } = require('discord-akairo');

class GuildMemberRemovedListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            eventName: 'guildMemberRemove'
        });
    }

    async exec(member) {
        await this.client.updateGuild(true)
        console.log(`=> ${member.user.tag} left the server.`);
    }
}

module.exports = GuildMemberRemovedListener;