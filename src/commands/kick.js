const { Command } = require('discord-akairo');
const infoEmbed = require('../utils/infoEmbed.js');
const argumentErrors = require('../utils/argumentErrors.js');

class KickCommand extends Command {
    constructor() {
        super('kick', {
            aliases: ['kick'],
            description: `Permet d'expulser un membre du serveur.`,
            args: [
                {
                    id: 'member',
                    type: 'member',
                    default: null
                },
                {
                    id: 'reason',
                    match: 'rest',
                    default: undefined
                }
            ],
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS'],
            channelRestriction: 'guild'
        });
    }

    exec(message,args) {
        argumentErrors(message,args)
        if(message.errored) return;
        if(!args.member.kickable) return message.channel.send(infoEmbed(message.author, "Je ne peux pas expulser ce membre.", this.client.config.colors.RED))
        const posCompare = message.member.roles.array().sort((a,b)=>b.comparePositionTo(a))[0].comparePositionTo(args.member.roles.array().sort((a,b)=>b.comparePositionTo(a))[0])
        const kickable = posCompare !== 0 || String(posCompare).includes('-')
        if(!kickable) return message.channel.send(infoEmbed(message.author, `Vous ne pouvez pas expulser ce membre.`, this.client.config.colors.RED))
        this.client.emit('custom-kick', args.member, message.member, message, args.reason)
    }

}

module.exports = KickCommand;