const fs = require('fs');
const env = fs.readdirSync('env');
let envObj = {};

env.forEach(element => {
     let obj = require(`../env/${element}`);

     for(const [key, value] of Object.entries(obj)) {
        envObj[key] = value;    
    }
});

module.exports = () => { 
    for(const [key, value] of Object.entries(envObj)) {
        process.env[key] = value;
    }
};

