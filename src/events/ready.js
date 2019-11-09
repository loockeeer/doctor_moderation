const { Listener } = require('discord-akairo');
const update = require('../utils/updateStats.js');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            eventName: 'ready'
        });
    }

    async exec() {
        console.log('=> Ready');
        console.log('=> Logged in as '+this.client.id);
        console.log('=> A pretty cool bot, made by Loockeeer.');
        await require('../utils/updateGuild.js')(this.client);
        setInterval(this.client.refreshModeration, 2000);
        update(this.client);
    }
}

module.exports = ReadyListener;