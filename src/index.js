const { AkairoClient } = require('discord-akairo');
const config = require('./config.json');

const client = new AkairoClient({
    ownerID: config.OWNERS,
    prefix: require('./token.json'),
    commandDirectory: './commands',
    listenerDirectory: './events'
});
client.config = config
client.updateGuild = require('./utils/updateGuild.js');
client.login(config.TOKEN)