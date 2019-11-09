const { Command } = require('discord-akairo');
const argumentErrors = require('../utils/argumentErrors.js');
const eval = require('discord-eval.js');

class EvalCommand extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval'],
            description: "Permet d'évaluer du code JavaScript.",
            args: [
                {
                    id: 'code',
                    match: 'rest',
                    default: undefined
                }
            ],
            userPermissions: ['ADMINISTRATOR'],
            channelRestriction: 'guild'
        });
    }

    exec(message,args) {
        argumentErrors(message,args)
        if(message.errored) return;
        return eval(args.code,message,this.client)
    }

}

module.exports = EvalCommand;