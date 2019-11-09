const { Command } = require('discord-akairo');
const infoEmbed = require('../utils/infoEmbed.js');
const argumentErrors = require('../utils/argumentErrors.js');
const Discord = require('discord.js');
const dpag = require('discord-pagination.js');
const db = require('../utils/graphQLConnect.js');

class ModSeeCommand extends Command {
    constructor() {
        super('modsee', {
            aliases: ['modsee', 'msee'],
            description: `Permet de voir la liste des opérations de modération en rapport avec le membre choisi.`,
            args: [
                {
                    id: 'member',
                    type: 'member',
                    default: null
                }
            ],
            clientPermissions: ['KICK_MEMBERS'],
            channelRestriction: 'guild'
        });
    }

    async exec(message, args) {
        argumentErrors(message, args)
        if (message.errored) return;
        const mod = (await db.query(`
query {
  allWarns(condition: {targetId: "${args.member.user.id}"}) {
    nodes {
      id
      createdAt
      reason
      moderatorId
      targetId
    }
  }
  allBans(condition: {targetId: "${args.member.user.id}"}) {
    nodes {
      createdAt
      moderatorId
      id
      reason
      time
      targetId
    }
  }
  allMutes(condition: {targetId: "${args.member.user.id}"}) {
    nodes {
      createdAt
      id
      moderatorId
      reason
      targetId
      time
    }
  }
  allKicks(condition: {targetId: "${args.member.user.id}"}) {
    nodes {
      createdAt
      id
      moderatorId
      reason
      targetId
    }
  }
}

`)).map(b => {

            let n = b[1].nodes.map(node => {
                node.type = b[0].replace('all', '').replace('s', '');
                return node
            });

            return n
        }).reduce((a, b) => a.concat(b));
        let embeds = [];
        for (var i = 0; i < mod.length; i++) {
            const embed = new Discord.RichEmbed();
            embed.setAuthor(mod[i].type, this.client.users.get(mod[i].targetId).displayAvatarURL);
            embed.addField('Modérateur', this.client.users.get(mod[i].moderatorId),true);
            embed.addField('Raison', mod[i].reason || "Aucune", true);
            if(mod[i].time) embed.addField('Durée', mod[i].time != -1 ? mod[i].time : "Aucune",true);
            embed.addField('Date de création', new Date(Number(mod[i].createdAt)),true);
            embed.setFooter("ID :: "+mod[i].id)
            embeds.push(embed)

        }
        if(embeds.length === 0) return message.channel.send(infoEmbed(message.author, "Aucune action de modération n'a été effectuée sur cet utilisateur"))

        const pag = new dpag.Pagination();
        pag.setClient(this.client);
        pag.setMaxItemsPerPage(1);
        pag.setEmbeds(embeds);

        pag.on('start', async () => {
            await pag.message.react('◀');
            await pag.message.react('▶');

        })
        pag.on('react', async (user, reaction) => {
            if (reaction.name == "▶") {
                pag.turn(1);
                pag.update()
            }
            if (reaction.name == "◀") {
                pag.turn(-1);
                pag.update()
            }
        });
        await pag.build(message.channel)

    }
}
module.exports = ModSeeCommand;