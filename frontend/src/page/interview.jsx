import React, { useState, useRef, useEffect } from "react";
import { User, Bot, Camera, CameraOff, Play,Square } from "lucide-react";

export default function Interview() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [chat, setchat] = useState([]);
  const [cameraOn, setCameraOn] = useState(false);

  const recognitionRef = useRef(null);
  const stopRef = useRef(false);
  const videoRef = useRef(null);
  const bottomRef = useRef(null);

  const questions = [
    "Welcome to the interview.Tell me about yourself",
    "Why do you want to work with our company?",
    "Tell me about a difficult technical challenge you solved."
  ];

  const speakQuestion = (text) => {
    return new Promise((resolve) => {
      setIsSpeaking(true);
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
     
      utterance.onend = () => {
        setchat((prev) => [
          ...prev,
          { Question: text}
        ]);
        setIsSpeaking(false);
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  };

  const startListening = (question) => {
    return new Promise((resolve, reject) => {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SR) return reject("Speech Recognition not supported");

      const recognition = new SR();
      recognition.lang = "en-US";

      setIsListening(true);

      recognition.onresult = (e) => {
        const text = e.results[0][0].transcript;

        setAnswers((prev) => [
          ...prev,
          { Question: question, Answer: text }
        ]);
         setchat((prev) => [
          ...prev,
          { Answer: text}
        ]);
        setIsListening(false);
        resolve(text);
      };

      recognition.onerror = reject;
      recognition.onend = () => setIsListening(false);

      recognition.start();
    });
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const startInterview = async () => {
    try {
      startCamera();
      setAnswers([]);
      setchat([]);
      stopRef.current = false;
      for (let i = 0; i < questions.length; i++) {
        if(stopRef.current) break;
        setCurrentStep(i);
        await speakQuestion(questions[i]);

        if(stopRef.current) break;
        const answer = await startListening(questions[i]);
        console.log("User Answer:", answer);

        if(stopRef.current) break;
        if (i < questions.length - 1)
          await sleep(1800);
    
      }
      setCameraOn(false);
      await speakQuestion("Interview completed. Thank you!");

    } catch (err) {
      console.log("Error:", err);
    }
  };

  const startCamera = async () => {
    try {
      setCameraOn(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.log("Camera error:", err);
      setCameraOn(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [answers]);

  return (
    <div className="min-h-screen bg-gray-100 p-2">

      {/* Header */}
      <div className="flex justify-center gap-2 mb-8">
         <button onClick={startInterview}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded">
          <Play size={18} />
          Start Interview
        </button>
        <button onClick={() => {
            stopRef.current = true;
            setIsListening(false);
            setIsSpeaking(false);
            }}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded">
          <Square size={18} />
          Stop
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-6">

        <div className="">
          <img
          src="https://media.istockphoto.com/id/1471886613/photo/mature-businesswoman-smiles-encouragingly-at-unrecognizable-female-job-applicant.jpg?s=612x612&w=0&k=20&c=iptlFp50WMHKZ-VDJPVFR0Ar0RYUOoh3K2H29hb1HW4="
          alt="preview"
          className="h-72 w-full max-w-md bg-white flex items-center justify-center rounded-lg shadow"
        />
        {isSpeaking && (
       <p className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-center">
        Speaking...
        </p>
        )}
        {isListening && (
       <p className="mt-2 bg-green-400 text-white px-3 py-1 rounded text-center">
        Listening...
        </p>
        )}
         {!isListening && !isSpeaking &&  (
        <p className="mt-2 text-gray-100 px-3 py-1 rounded text-center">
         {1}
        </p>
        )}
        </div>

        <div className="h-72 w-full max-w-md bg-white flex flex-col items-center justify-center rounded-lg shadow">

          {cameraOn ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="h-full w-full object-cover rounded-lg "
            />
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <CameraOff size={30} />
              <p>Camera Off</p>
            </div>
          )}

          {!cameraOn && <button onClick={startCamera}
            className="mt-3 flex items-center gap-2 bg-gray-400 text-white px-3 py-1 rounded">
            <Camera size={16} />
            Start Camera
          </button> }
         
        </div>
      </div>

      {/* Answers bottom */}
      <div className="flex shadow-xl flex-col-reverse mt-[7.25%] mx-auto rounded-lg text-center mt-2 max-h-50 min-h-13 text-black overflow-y-auto bg-gray-200/25 border-2  border-gray-200 w-[75%] pt-1">

        {[...chat].reverse().map((ans, i) => (
          <div key={i} className="flex mb-2 p-1 ">
            {ans.Question && <p className="px-4 py-3 bg-sky-100 w-fit max-w-[80%] rounded-3xl"><strong>Interviewer:</strong> {ans.Question}</p> }

            {ans.Answer && <p className=" px-4 py-3 bg-emerald-100  w-fit max-w-[80%] ml-auto rounded-3xl"><strong>Candidate:</strong> {ans.Answer}</p> }
          </div>
        ))}
      
        
      </div>

      

    </div>
  );
}