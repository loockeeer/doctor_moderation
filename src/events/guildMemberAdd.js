const { Listener } = require('discord-akairo');

class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            eventName: 'guildMemberAdd'
        });
    }

    async exec(member) {
        await this.client.updateGuild(true)
        console.log(`=> ${member.user.tag} joined the server.`);
    }
}

module.exports = GuildMemberAddListener;