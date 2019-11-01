const conn = require('./graphQLConnect.js');
module.exports = async function (silent) {
    const guild = this.guilds.get(this.config.GUILD_ID);
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

    // Fetch ToDelete Members
    const membersToDelete = membersRegistered.filter(u=>!guild.members.find(m=>m.user.id===u.id));
    const membersDeletePromises = [];
    membersToDelete.forEach(member=>{
        membersDeletePromises.push(conn.query(`mutation { deleteUserById(input: {id: "${member.id}"}) { user { id } } }`))
    });

    // Fetch ToDelete Bots
    const botsToDelete = botsRegistered.filter(u=>!guild.members.find(m=>m.user.id===u.id));
    const botsDeletePromises = [];
    botsToDelete.forEach(bot=>{
        botsDeletePromises.push(conn.query(`mutation { deleteBotById (input: {id: "${bot.id}"}) { bot { id } } }`))
    });


    // AddBots
    Promise.all(botsAddPromises).then(()=>{
        if(!silent) console.log('=> Succesfully added '+botsAddPromises.length+' bots to the database.')
    });

    // AddUsers
    Promise.all(membersAddPromises).then(()=>{
        if(!silent) console.log('=> Succesfully added '+membersAddPromises.length+' users to the database.')
    });
    // DeleteBots
    Promise.all(botsDeletePromises).then(()=>{
        if(!silent) console.log('=> Succesfully deleted '+botsDeletePromises.length+' bots from the database.')
    });
    // DeleteUsers
    Promise.all(membersDeletePromises).then(()=>{
        if(!silent) console.log('=> Succesfully deleted '+membersDeletePromises.length+' users from the database.')
    });
}