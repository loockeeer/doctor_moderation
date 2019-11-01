const { Command } = require('discord-akairo');
const infoEmbed = require('../utils/infoEmbed.js');
const argumentErrors = require('../utils/argumentErrors.js');

class BanCommand extends Command {
    constructor() {
        super('ban', {
            aliases: ['ban'],
            description: "Permet de bannir un membre du serveur.",
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
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            channelRestriction: 'guild'
        });
    }

    exec(message,args) {
        argumentErrors(message,args)
        if(message.errored) return;
        if(!args.member.bannable) return message.channel.send(infoEmbed(message.author, "Je ne peux pas bannir ce membre.", this.client.config.colors.RED))
        const posCompare = message.member.roles.array().sort((a,b)=>b.comparePositionTo(a))[0].comparePositionTo(args.member.roles.array().sort((a,b)=>b.comparePositionTo(a))[0])
        const bannable = posCompare !== 0 || String(posCompare).includes('-')
        console.log(args.reason)
        if(!bannable) return message.channel.send(infoEmbed(message.author, `Vous ne pouvez pas bannir ce membre.`, this.client.config.colors.RED))
        this.client.emit('custom-ban', args.member, message.member, message, args.reason)
    }

}

module.exports = BanCommand;