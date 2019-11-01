const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            eventName: 'ready'
        });
    }

    async exec() {
        console.log('=> Ready');
        await this.client.updateGuild();
    }
}

module.exports = ReadyListener;