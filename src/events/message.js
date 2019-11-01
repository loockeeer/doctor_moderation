const { Listener } = require('discord-akairo');

class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            eventName: 'message'
        });
    }

    async exec() {
        // Add some code here if needed.
    }
}

module.exports = MessageListener;