module.exports = (client) => {
    const [bots, users] = client.guilds.get(client.config.GUILD_ID).members.partition(m => m.user.bot)
    client.channels.get(client.config.stats.MEMBERS).setName(`👤Membres : ${users.size}`);
    client.channels.get(client.config.stats.BOTS).setName(`🤖Bots : ${bots.size}`);
};
