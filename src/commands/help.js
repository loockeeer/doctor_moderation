const { Command } = require('discord-akairo');
const infoEmbed = require('../utils/infoEmbed.js');
const { RichEmbed } = require('discord.js');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            description: `Permet d'afficher le menu d'aide.`,
            args: [
                {
                    id: 'command',
                    type: 'commandAlias',
                    default: undefined
                }
            ]
        });
    }

    exec(message, args) {
        const commands = this.client.commandHandler.modules.map(m=>m.aliases[0]);
        if(!args.command) {
            const embed = new RichEmbed()
                .setAuthor(`Menu d'aide`, message.author.displayAvatarURL)
                .setDescription(`${this.client.akairoOptions.prefix}help <commande>`)
                .addField(`Commandes`,commands.join(`, `))
                .setTimestamp()
                .setFooter(this.client.user.tag, this.client.user.displayAvatarURL)
                .setColor('RANDOM');
            message.channel.send(embed);
        } else {
            const embed = new RichEmbed()
                .setAuthor(args.command.aliases[0], message.author.displayAvatarURL)
                .setDescription(args.command.description || "Pas de description")
                .addField('Permission requise', args.command.clientPermissions ? `\`${args.command.clientPermissions[0]}\`` : "Aucune")
                .addField('Aliases', args.command.aliases.length > 1 ? args.command.aliases.splice(0,1).join(`\n`) : "Aucun")
                .addField('Cooldown', args.command.cooldown ? args.command.cooldown+" secondes." : "Aucun <a:dancing:576104669516922881>")
                .setTimestamp()
                .setColor('RANDOM')
                .setFooter(this.client.user.tag, this.client.user.avatarURL);
            message.channel.send(embed)
        }
    }
}
module.exports = HelpCommand;