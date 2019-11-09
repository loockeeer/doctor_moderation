const { AkairoClient } = require('discord-akairo');
const config = require('./config.json');
const client = new AkairoClient({
    ownerID: config.OWNERS,
    prefix: config.PREFIX,
    commandDirectory: './commands',
    listenerDirectory: './events'
});

client.config = config
client.refreshModeration = require('./utils/refreshModeration.js');
client.login(require('./token.json'))