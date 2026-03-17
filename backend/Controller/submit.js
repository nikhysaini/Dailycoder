const Problem = require("../model/problem");
const user = require("../model/user");
const Submission = require("../model/submission");
const {getLanguageById,submitBatch,submitToken} = require("../utilis/problemutility");
const jwt = require('jsonwebtoken')

const submitCode = async (req,res)=>{
   
    try{
       const token = req.headers.token;
      // const {token} = req.cookies;
       const payload = jwt.verify(token,process.env.JWT_TOKEN_KEY)
       const userId = payload.id ;
       const problemId = req.params.id;

       const {code,language} = req.body;

      if(!userId||!code||!problemId||!language)
        return res.status(400).send("Some field missing");

    const problem =  await Problem.findById(problemId);
    if(!problem) return res.status(400).send("Some field missing");
    const submittedResult = await Submission.create({
          userId,
          problemId,
          code,
          language,
          status:'pending',
          testCasesTotal:problem.hiddenTestCases.length
        })
 

    const languageId = getLanguageById(language);

    const submissions = problem.hiddenTestCases.map((testcase)=>({
        source_code:code,
        language_id: languageId,
        stdin: testcase.input,
        expected_output: testcase.output
    }));

   
    const submitResult = await submitBatch(submissions);
    
    const resultToken = submitResult.map((value)=> value.token);

    const testResult = await submitToken(resultToken);
    
    var testCasesPassed = 0;
    var runtime = 0;
    var memory = 0;
    var status = 'Accepted';
    var errorMessage = null;
   
    for(const test of testResult){
      
        if(test.status_id==3){
           testCasesPassed++;
           runtime = runtime+parseFloat(test.time)
           memory = Math.max(memory,test.memory);
        }
        else{
         
          if(test.status_id===4) status = 'Wrong Answer'
          else if(test.status_id===5) status = 'Time Limit Exceeded'
          else if(test.status_id===6) status = 'Compilation Error'
          else if(test.status_id===7) status = 'Runtime Error'
          else if(test.status_id===8) status = 'Memory Limit Exceeded'
          else if(test.status_id===10 || test.status_id===11) status = 'Wrong Answer'
          else
              status = 'Try after some time'
          errorMessage = test.stderr
          break;
        
        }
         
        }
    

    submittedResult.status= status;
    submittedResult.testCasesPassed = testCasesPassed;
    submittedResult.errorMessage = errorMessage;
    submittedResult.runtime = runtime;
    submittedResult.memory = memory;
    await submittedResult.save();
    
    await user.findByIdAndUpdate(
         payload.id,
         { $push: { problemsolved: problemId } },
      );
    res.status(201).send(submittedResult);
       
    }
    catch(err){
      res.status(500).send("Internal Server Error "+ err);
    }

}

const RunCode = async(req,res)=>{
  
   try{
       const problemId = req.params.id;
       const {code,language} = req.body;

      if(!code||!problemId||!language)
        return res.status(400).send("Some field missing");

    const problem =  await Problem.findById(problemId);
    if(!problem) return res.status(400).send("Some field missing");
  
    const languageId = getLanguageById(language);

    const submissions = problem.visibleTestCases.map((testcase)=>({
        source_code:code,
        language_id: languageId,
        stdin: testcase.input,
        expected_output: testcase.output
    }));

   
    const submitResult = await submitBatch(submissions);
    
    const resultToken = submitResult.map((value)=> value.token);

    const testResult = await submitToken(resultToken);
    
    var testCasesPassed = 0;
    var runtime = 0;
    var memory = 0;
    var status = 'accepted';
    var errorMessage = null;

    console.log(testResult);
    for(const test of testResult){
      
        if(test.status_id==3){
           testCasesPassed++;
           runtime = runtime+parseFloat(test.time)
           memory = Math.max(memory,test.memory);
        }else{
          if(test.status_id===4) status = 'Wrong Answer'
          else if(test.status_id===5) status = 'Time Limit Exceeded'
          else if(test.status_id===6) status = 'Compilation Error'
          else if(test.status_id===7) status = 'Runtime Error'
          else if(test.status_id===8) status = 'Memory Limit Exceeded'
          else if(test.status_id===10 || test.status_id===11) status = 'Wrong Answer'
          else
              status = 'Try after some time'
          errorMessage = test.stderr
          break;
        }
    }

    res.status(201).send(testResult);
       
    }
    catch(err){
      res.status(500).send("Internal Server Error "+ err);
    }
}
module.exports = {submitCode,RunCode};


//     language_id: 54,
//     stdin: '2 3',
//     expected_output: '5',
//     stdout: '5',
//     status_id: 3,
//     created_at: '2025-05-12T16:47:37.239Z',
//     finished_at: '2025-05-12T16:47:37.695Z',
//     time: '0.002',
//     memory: 904,
//     stderr: null,
//     token: '611405fa-4f31-44a6-99c8-6f407bc14e73',