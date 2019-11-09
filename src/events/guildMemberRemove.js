const { Listener } = require('discord-akairo');
const update = require('../utils/updateStats.js');
class GuildMemberRemovedListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            eventName: 'guildMemberRemove'
        });
    }

    async exec(member) {
        console.log(`=> ${member.user.tag} left the server.`);
        update(this.client);
    }
}

module.exports = GuildMemberRemovedListener;