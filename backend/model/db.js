const mongoose = require('mongoose')

async function main(){
 await mongoose.connect(process.env.MONGOOSE_KEY)
}

module.exports = main;