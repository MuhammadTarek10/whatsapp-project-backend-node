const config = require('config');

module.exports = function(){
    const key = config.get('jwtPrivateKey') || process.env.jwtPrivateKey;
    if(!key){
        throw new Error('FATAL ERROR: No jwt key is provided');
    }else{
        console.log(`Top Secret: ${key}`);
    }
}