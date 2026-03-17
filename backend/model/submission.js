const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problemId: {
    type: Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending'
  },
  runtime: {
    type: Number, 
    default: 0
  },
  memory: {
    type: Number, 
    default: 0
  },
  errorMessage: {
    type: String,
    default: ''
  },
  testCasesPassed: {
    type: Number,
    default: 0
  },
  testCasesTotal: { 
    type: Number,
    default: 0
  }
}, { 
  timestamps: true
});

// Performing indexing Manually , in this it first sort based on userId and 
// then sort based on problemId  , it sort like vector<pair<int,int>> sorted forms.
// We can find query from {userId,problemId} or userId 
// but not on problem ID , because it first sort based on userID , only problemId will not work
submissionSchema.index({userId:1,problemId:1})


const Submission = mongoose.model('submission',submissionSchema);

module.exports = Submission;