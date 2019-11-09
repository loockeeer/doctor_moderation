const axios = require('axios');
class GraphClient {
    constructor(url) {
        this.url = url
    }
    query(query){
        return new Promise((resolve,reject) => {
            axios.post(this.url, {
                    query:query
            }).then(rs=>{
                const result = Object.entries(rs.data.data)
                resolve(result)
            }).catch(err=> {
                if(err.response.status === 400) {
                    reject(err.response.data.errors);

                } else {
                    console.log('=> Cannot connect to database API.');
                    process.exit()
                }
            })
        })
    }
}

module.exports = GraphClient