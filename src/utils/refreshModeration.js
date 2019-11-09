const db = require('./graphQLConnect.js');
module.exports = async function () {
    const mod = (await db.query(`
query {
  allWarns{
    nodes {
      id
      createdAt
      reason
      moderatorId
      targetId
    }
  }
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
  allKicks {
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
        return b[1].nodes.map(node => {
            node.type = b[0].replace('all', '').replace('s', '');
            return node
        });
    }).reduce((a, b) => a.concat(b));
    for(const action of mod) {
        if (action.time) {
            console.log(action.createdAt < action.time)
        }
    }
};