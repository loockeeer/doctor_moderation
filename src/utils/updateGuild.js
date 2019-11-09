const conn = require('./graphQLConnect.js');
module.exports = async function (client, silent) {
    const guild = client.guilds.get(client.config.GUILD_ID);
    // Fetch Registered Bots
    const botsRegistered = (await conn.query(`query { allBots { nodes { id } } }`).catch(err=>{}))[0][1].nodes;

    // Fetch Registered Members
    const membersRegistered = (await conn.query(`query { allUsers { nodes { id } } }`).catch(err=>{}))[0][1].nodes;

    // Fetch ToAdd Members
    const membersToAdd = guild.members.filter(m=>!m.user.bot).filter(m=>!membersRegistered.find(u=>m.user.id===u.id));
    const membersAddPromises = []
    membersToAdd.forEach(member=>{
        membersAddPromises.push(conn.query(`mutation { createUser(input: {user: {id: "${member.user.id}"}}) { user { id } } }`))
    });

    // Fetch ToAdd Bots
    const botsToAdd = guild.members.filter(m=>m.user.bot).filter(m=>!botsRegistered.find(u=>m.user.id===u.id));
    const botsAddPromises = [];
    botsToAdd.forEach(bot=>{
        botsAddPromises.push(conn.query(`mutation { createBot(input: {bot: {id: "${bot.user.id}"}}) { bot { id } } }`))
    });


    // AddBots
    Promise.all(botsAddPromises).then(()=>{
        if(!silent) console.log('=> Succesfully added '+botsAddPromises.length+' bots to the database.')
    });

    // AddUsers
    Promise.all(membersAddPromises).then(()=>{
        if(!silent) console.log('=> Succesfully added '+membersAddPromises.length+' users to the database.')
    });
}