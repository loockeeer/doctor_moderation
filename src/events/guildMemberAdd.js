const { Listener } = require('discord-akairo');
const update = require('../utils/updateStats.js');
class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            eventName: 'guildMemberAdd'
        });
    }

    async exec(member) {
        await require('../utils/updateGuild.js')(this.client,true);
        console.log(`=> ${member.user.tag} joined the server.`);
        update(this.client);
    }
}

module.exports = GuildMemberAddListener;