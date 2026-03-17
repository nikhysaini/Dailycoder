const {getLanguageById,submitBatch,submitToken} = require('../utilis/problemutility')
const Problem = require('../model/problem')
const user = require('../model/user')
const jwt = require('jsonwebtoken');


const createProblem = async(req,res)=>{
const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution, problemCreator
    } = req.body;
  const count = await Problem.countDocuments({});
  try{
    for(const {language,completeCode} of referenceSolution){
    
    const languageId = getLanguageById(language);
    
      const submissions = visibleTestCases.map((testcase)=>({
            source_code:completeCode,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));

       const submitResult = await submitBatch(submissions);

       const resultToken = submitResult.map((value)=> value.token);

       const testResult = await submitToken(resultToken);


       for(const test of testResult){
        if(test.status_id!=3){
         console.log(test.status_id);
         if(test.status_id==4) return res.status(400).send("Wrong Answer");
         if(test.status_id==5) return res.status(400).send("Time Limit Exceeded");
         if(test.status_id==6) return res.status(400).send("Compilation Error");
         if(test.status_id=7) return res.status(400).send("Runtime Error (SIGSEGV)");
        }
       }
    
    }
   const {token} = req.cookies;
   const payload = jwt.verify(token,process.env.JWT_TOKEN_KEY)
   const users = await user.findOne({email:payload.email})
   const count = await Problem.countDocuments({});
    const userProblem =  await Problem.create({
        ...req.body,
        problemCreator: users._id,
        id:count+1
      });

      res.status(201).send("Problem Saved Successfully");
  }
   catch(e)
  {
    res.status(404).send(e.message);
  }
}

const updateProblem = async (req,res)=>{
    
  const {id} = req.params;
  const {title,description,difficulty,tags,
    visibleTestCases,hiddenTestCases,startCode,
    referenceSolution, problemCreator
   } = req.body;

  try{

     if(!id){
      return res.status(400).send("Missing ID Field");
     }

    const DsaProblem =  await Problem.findById(id);
    if(!DsaProblem)
    {
      return res.status(404).send("ID is not persent in server");
    }
    for(const {language,completeCode} of referenceSolution){
    
    const languageId = getLanguageById(language);
    
      const submissions = visibleTestCases.map((testcase)=>({
            source_code:completeCode,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));


       
       const submitResult = await submitBatch(submissions);

       const resultToken = submitResult.map((value)=> value.token);

       const testResult = await submitToken(resultToken);


       for(const test of testResult){
        if(test.status_id!=3){
         console.log(test.status_id);
         if(test.status_id==4) return res.status(400).send("Wrong Answer");
         if(test.status_id==5) return res.status(400).send("Time Limit Exceeded");
         if(test.status_id==6) return res.status(400).send("Compilation Error");
         if(test.status_id=7) return res.status(400).send("Runtime Error (SIGSEGV)");
        }
       }
    
    }  

  const newProblem = await Problem.findByIdAndUpdate(id , {...req.body}, {runValidators:true, new:true});
   
  res.status(200).send(newProblem);
  }
  catch(err){
      res.status(500).send("Error: "+err);
  }
}

const deleteProblem = async(req,res)=>{
  const {id} = req.params;
   console.log(id);
  try{
     
    if(!id)
      return res.status(400).send("ID is Missing");

   //return res.status(404).json({message:"Problem is Missing"});

   const deletedProblem = await Problem.findByIdAndDelete(id);

   if(!deletedProblem)
    return res.status(404).json({message:"Problem is Missing"});

   res.status(200).json("Successfully Deleted");
  }
  catch(err){
    res.status(500).json("Error: "+err);
  }
}

const getProblemById = async(req,res)=>{
 
  const {id} = req.params;
  const {token} = req.cookies;
  console.log(id,token);
  try{
     
    if(!id)
      return res.status(400).send("ID is Missing");

    const getProblem = await Problem.findById(id).select('_id title description difficulty tags visibleTestCases hiddenTestCases startCode');

   if(!getProblem)
    return res.status(404).send("Problem is Missing");

   res.status(200).json(getProblem);
  }
  catch(err){
    res.status(500).send("Error: "+err);
  }
}

const getAllProblem = async(req,res)=>{

  try{
     
   const getProblem = await Problem.find({}).select('_id title difficulty tags Constraints');

   if(getProblem.length==0)
    return res.status(404).send("Problem is Missing");

   res.status(200).send(getProblem);
  }
  catch(err){
    res.status(500).send("Error: "+err);
  }
}

const solvedAllProblembyUser = async(req,res)=>{

  try{
   
   const {token} = req.cookies;
   const payload = jwt.verify(token,process.env.JWT_TOKEN_KEY)

   const getAllProblem = await user.findById(payload.id).populate({
     path:'problemsolved',
     select:'_id title difficulty tags'
    })

   res.status(200).send(getAllProblem.problemsolved);
  }
  catch(err){
    res.status(500).send("Error: "+err);
  }
}

module.exports = {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem,solvedAllProblembyUser};