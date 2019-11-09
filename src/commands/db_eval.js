const {Command} = require('discord-akairo');
const infoEmbed = require('../utils/infoEmbed.js');
const argumentErrors = require('../utils/argumentErrors.js');
const db = require('../utils/graphQLConnect.js');

class DBEvalCommand extends Command {
    constructor() {
        super('dbeval', {
            aliases: ['dbeval'],
            description: "Permet d'éxécuter une query sur la base de données du serveur?.",
            args: [
                {
                    id: 'query',
                    match: 'rest',
                    default: undefined
                }
            ],
            userPermissions: ['ADMINISTRATOR'],
            channelRestriction: 'guild'
        });
    }

    exec(message, args) {
        argumentErrors(message, args)
        if (message.errored) return;
        db.query(args.query).then(rs => {
            return message.channel.send(infoEmbed(message.author, '```\n' + JSON.stringify(rs[0][1], null, 2).substring(0, 1990) + '\n```'));
        }).catch(err => {
            return message.channel.send(infoEmbed(message.author, '```\n' + JSON.stringify(err, null, 2) + '\n```'))
        })
    }

}

module.exports = DBEvalCommand;