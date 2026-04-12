const mongoose = require('mongoose')

const problemSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        required:true,
    },
    tags:{
        type:[String],
    },
    constraints:{
        type:[String],
    },
    visibleTestCases:[
        {
            input:{
                type:String,
                required:true,
            },
            sinput:{
                type:String,
                required:true,
            },
            output:{
                type:String,
                required:true,
            },
            explanation:{
                type:String,
                required:true
            }
        }
    ],

    hiddenTestCases:[
        {
            input:{
                type:String,
                required:true,
            },
            output:{
                type:String,
                required:true,
            }
        }
    ],

    startCode: [
        {
            language:{
                type:String,
            },
            initialCode:{
                type:String,
            }
        }
    ],

    referenceSolution:[
        {
            language:{
                type:String,
                required:true,
            },
            completeCode:{
                type:String,
                required:true
            }
        }
    ],

    problemCreator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true

    }
})


const Problem = mongoose.model('problem',problemSchema);

module.exports = Problem;

