const { Command } = require('discord-akairo');
const infoEmbed = require('../utils/infoEmbed.js');
const argumentErrors = require('../utils/argumentErrors.js');

class WarnCommand extends Command {
    constructor() {
        super('warn', {
            aliases: ['warn'],
            description: 'Permet d\'avertir un membre.',
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
            userPermissions: ['KICK_MEMBERS'],
            channelRestriction: 'guild'
        });
    }

    exec(message, args) {
        argumentErrors(message,args)
        if(message.errored) return;
        if(args.member.user.bot) return message.channel.send(infoEmbed(message.author, "Vous ne pouvez pas avertir un bot.", this.client.config.colors.RED))
        if(!args.member.kickable) return message.channel.send(infoEmbed(message.author, "Je ne peux pas avertir ce membre.", this.client.config.colors.RED))
        const posCompare = message.member.roles.array().sort((a,b)=>b.comparePositionTo(a))[0].comparePositionTo(args.member.roles.array().sort((a,b)=>b.comparePositionTo(a))[0])
        const warnable = posCompare !== 0 || String(posCompare).includes('-')
        if(!warnable) return message.channel.send(infoEmbed(message.author, `Vous ne pouvez pas avertir ce membre.`, this.client.config.colors.RED))
        this.client.emit('custom-warn', args.member, message.member, message, args.reason)
    }
}

module.exports = WarnCommand;