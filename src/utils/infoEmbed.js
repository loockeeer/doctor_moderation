const { RichEmbed } = require('discord.js')

module.exports = (target, text, color) => {
    const embed = new RichEmbed();
    embed.setAuthor(target.tag || target.name, target.displayAvatarURL || target.iconURL)
    embed.setDescription(text)
    embed.setColor(color || "RANDOM")
    embed.setFooter(target.client.user.tag, target.client.user.displayAvatarURL)
    return embed
}