const db = require('./graphQLConnect.js');
module.exports = async function (client) {
    const mod = (await db.query(`
query {
  allBans {
    nodes {
      createdAt
      moderatorId
      id
      reason
      time
      targetId
    }
  }
  allMutes {
    nodes {
      createdAt
      id
      moderatorId
      reason
      targetId
      time
    }
  }
}

`)).map(b => {
        return b[1].nodes.map(node => {
            node.type = b[0].replace('all', '').replace('s', '');
            return node
        });
    }).reduce((a, b) => a.concat(b));
    for(const action of mod) {
        if (action.time) {
            if(Date.now() >= Number(action.createdAt)+Number(action.time)) {
                if(action.type == "Ban") {
                    client.emit('custom-unban', client.guilds.get(client.config.GUILD_ID).members.get(action.targetId), client.guilds.get(client.config.GUILD_ID).members.get(action.moderatorId), "Unban Automatique")
                    db.query(`mutation {updateBanById(input: {banPatch: {finished: true}, id: ${action.id}){clientMutationId}}`)
                    db.query(`mutation {updateBanById(input: {banPatch: {finished: true}, id: ${action.id}){clientMutationId}}`)

                    // TODO : Add UnBan
                } else if(action.type == "Mute") {
                    // TODO : Add UnMute
                }
                console.log(`Deleted 1 ${action.type.toLowerCase()}. TargetID = ${action.targetId} | ModID = ${action.moderatorId}`)
            }
        }
    }
};