const infoEmbed = require('./infoEmbed');
module.exports = (message, args) => {
    Object.entries(args).forEach(arg=>{
        if(arg[1] === null) message.channel.send(infoEmbed(message.author,`Argument manquant : **${arg[0]}**`,message.client.config.colors.RED))
        if(arg[1] === null) message.errored = true
    })
}