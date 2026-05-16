import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as faceapi from "face-api.js";
import jsPDF from "jspdf";
import app from "../firebase";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { generateQuestions } from "../gemini";
function Interview() {
  const navigate = useNavigate();

 const hrQuestions = [
  "Tell me about yourself?",
  "Why should we hire you?",
  "What are your strengths?",
  "What are your weaknesses?",
  "How do you handle pressure?",
  "Where do you see yourself in 5 years?"
];

const frontendQuestions = [
  "Explain React useEffect hook.",
  "Difference between let var const?",
  "What is JSX?",
  "What is virtual DOM?",
  "Explain props and state.",
  "What is API integration?"
];

const aimlQuestions = [
  "Difference between AI and ML?",
  "What is supervised learning?",
  "Explain neural networks.",
  "What is deep learning?",
  "What is overfitting?",
  "Explain NLP."
];
  const db = getFirestore(app);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
  async function loadQuestions() {
    const aiQuestions = await generateQuestions("Frontend Developer");
    setQuestions(aiQuestions);
  }

  loadQuestions();
}, []);
  const [answer, setAnswer] = useState("");
  const [codingAnswer, setCodingAnswer] = useState("");
  const [codeOutput, setCodeOutput] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [score, setScore] = useState(0);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [emotion, setEmotion] = useState("😊 Calm");
  const videoRef = useRef(null);
  const recognitionRef = useRef(null);
  const [darkMode, setDarkMode] = useState(true);
  const [communicationScore, setCommunicationScore] = useState(0);
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [warningCount, setWarningCount] = useState(0);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [role, setRole] = useState("HR");
  // SPEECH TO TEXT
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAnswer(transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  // CAMERA + MIC
useEffect(() => {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
        // START RECORDING
  const mediaRecorder = new MediaRecorder(stream);

  mediaRecorderRef.current = mediaRecorder;

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      chunksRef.current.push(event.data);
    }
  };

  mediaRecorder.start();
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

// GENERATE RANDOM QUESTIONS
useEffect(() => {

  let selectedQuestions = [];

  if (role === "HR") {
    selectedQuestions = hrQuestions;
  } else if (role === "Frontend") {
    selectedQuestions = frontendQuestions;
  } else if (role === "AIML") {
    selectedQuestions = aimlQuestions;
  }

  const shuffled = [...selectedQuestions]
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  setQuestions(shuffled);

}, [role]);useEffect(() => {

  let selectedQuestions = [];

  if (role === "HR") {
    selectedQuestions = hrQuestions;
  } else if (role === "Frontend") {
    selectedQuestions = frontendQuestions;
  } else if (role === "AIML") {
    selectedQuestions = aimlQuestions;
  }

  const shuffled = [...selectedQuestions]
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  setQuestions(shuffled);

}, [role]);useEffect(() => {

  let selectedQuestions = [];

  if (role === "HR") {
    selectedQuestions = hrQuestions;
  } else if (role === "Frontend") {
    selectedQuestions = frontendQuestions;
  } else if (role === "AIML") {
    selectedQuestions = aimlQuestions;
  }

  const shuffled = [...selectedQuestions]
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  setQuestions(shuffled);

}, [role]);useEffect(() => {

  let selectedQuestions = [];

  if (role === "HR") {
    selectedQuestions = hrQuestions;
  } else if (role === "Frontend") {
    selectedQuestions = frontendQuestions;
  } else if (role === "AIML") {
    selectedQuestions = aimlQuestions;
  }

  const shuffled = [...selectedQuestions]
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  setQuestions(shuffled);

}, [role]);
  // FULL SCREEN
  useEffect(() => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  }, []);

 // TAB SWITCH DETECTION
useEffect(() => {
  const handleVisibility = () => {
    if (document.hidden) {
      alert("⚠️ Warning: Tab switching detected!");

      setWarningCount((prev) => prev + 1);
    }
  };

  document.addEventListener(
    "visibilitychange",
    handleVisibility
  );

  return () => {
    document.removeEventListener(
      "visibilitychange",
      handleVisibility
    );
  };
}, []);
  // BLOCK RIGHT CLICK + COPY
useEffect(() => {
  const disableRightClick = (e) => {
    e.preventDefault();
    alert("⚠️ Right click disabled!");
  };

  const disableCopy = (e) => {
    e.preventDefault();
    alert("⚠️ Copy disabled!");
  };

  document.addEventListener(
    "contextmenu",
    disableRightClick
  );

  document.addEventListener(
    "copy",
    disableCopy
  );

  return () => {
    document.removeEventListener(
      "contextmenu",
      disableRightClick
    );

    document.removeEventListener(
      "copy",
      disableCopy
    );
  };
}, []);
 // SCREENSHOT WARNING
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "PrintScreen") {
      alert("⚠️ Screenshots are not allowed!");
    }
  };

  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener(
      "keydown",
      handleKeyDown
    );
  };
}, []);
// FACE DETECTION
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      console.log("Models Loaded");
    };

    loadModels();

    const interval = setInterval(async () => {
      if (videoRef.current) {
        const detection = await faceapi.detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        );

        if (!detection) {
          alert("⚠️ Face not detected!");
        } else {
          console.log("Face Detected");
          const emotions = [
  "😊 Calm",
  "😐 Neutral",
  "😄 Happy",
  "🤔 Thinking",
];

const randomEmotion =
  emotions[Math.floor(Math.random() * emotions.length)];

setEmotion(randomEmotion);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // AI SPEAK QUESTION
  useEffect(() => {
    const speech = new SpeechSynthesisUtterance(
      questions[currentQuestion]
    );

    speech.lang = "en-US";
    speech.rate = 1;

    window.speechSynthesis.speak(speech);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [currentQuestion]);

  // TIMER
  useEffect(() => {

  if (timeLeft > 0) {

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);

  } else {

    nextQuestion();

  }

}, [timeLeft]);

  // NEXT QUESTION
  const nextQuestion = () => {
    let points = 0;

    if (answer.length > 5) {
      points = 5;
    }

    if (answer.length > 20) {
      points = 10;
    }

    if (answer.length > 50) {
      points = 20;
    }

    setScore(score + points);
setCommunicationScore((score + points) + 10);

if (answer.length > 20) {
  setConfidenceScore(confidenceScore + 20);
}
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer("");
      setTimeLeft(120);
    } else {

  // STOP RECORDING
  if (mediaRecorderRef.current) {

    mediaRecorderRef.current.stop();

    mediaRecorderRef.current.onstop = () => {

      const blob = new Blob(chunksRef.current, {
        type: "video/webm",
      });

      const videoURL = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = videoURL;
      a.download = "AI_Interview_Record.webm";

      a.click();
    };
  }

  addDoc(collection(db, "interviews"), {
  role: role,
  score: score,
  communication: communicationScore,
  confidence: confidenceScore,
  warnings: warningCount,
  date: new Date().toLocaleString(),
});
  setInterviewCompleted(true);
}
  };
  const downloadReport = () => {

  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("AI Interview Report", 20, 20);

  doc.setFontSize(14);

  doc.text(`Role: ${role}`, 20, 50);

  doc.text(`Score: ${score}%`, 20, 70);

  doc.text(
    `Communication: ${communicationScore}%`,
    20,
    90
  );

  doc.text(
    `Confidence: ${confidenceScore}%`,
    20,
    110
  );

  doc.text(
    `Performance: ${
      score > 60 ? "Excellent" : "Good"
    }`,
    20,
    130
  );

  doc.save("Interview-Report.pdf");
};
if (questions.length === 0) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#071c2f",
        color: "white",
        fontSize: "30px",
      }}
    >
      Loading AI Questions...
    </div>
  );
}
  // COMPLETED SCREEN
  if (interviewCompleted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #071c2f, #0d3c55, #0b7285)",
          color: "white",
          flexDirection: "column",
        }}
      >
        <h1 style={{ fontSize: "55px" }}>
          🎉 Interview Completed
        </h1>

        <h2>Your Score: {score}%</h2>
<h2>🗣 Communication: {communicationScore}%</h2>

<h2>🔥 Confidence: {confidenceScore}%</h2>

<h2>
  📈 Performance:
  {score > 60 ? " Excellent" : " Good"}
</h2>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: "20px",
            padding: "12px 25px",
            border: "none",
            borderRadius: "10px",
            background: "#00f5ff",
            color: "black",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Restart
        </button>

        <button
  onClick={() => navigate("/")}
  style={{
    marginTop: "15px",
    padding: "12px 25px",
    border: "none",
    borderRadius: "10px",
    background: "#111",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  Home
</button>

<button
  onClick={downloadReport}
  style={{
    marginTop: "15px",
    padding: "12px 25px",
    borderRadius: "10px",
    border: "none",
    background: "#00f5ff",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  Download Report
</button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: darkMode
  ? "linear-gradient(135deg, #071c2f, #0d3c55, #0b7285)"
  : "linear-gradient(135deg, #dbeafe, #e0f2fe, #f8fafc)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: darkMode ? "white" : "#111",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "80%",
          maxWidth: "900px",
          padding: "40px",
          borderRadius: "25px",
          background: "rgba(255,255,255,0.05)",
          boxShadow: darkMode
           ? "0px 0px 30px #00f5ff"
           : "0px 0px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* CAMERA */}
        <video
          ref={videoRef}
          autoPlay
          muted
          style={{
            width: "180px",
            height: "140px",
            borderRadius: "20px",
            objectFit: "cover",
            border: "3px solid #00f5ff",
            boxShadow: "0px 0px 20px #00f5ff",
            marginBottom: "25px",
          }}
        />

        {/* WARNING */}
        <div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "9px",
  }}
>
  <p
    style={{
      color: "red",
      fontWeight: "bold",
    }}
  >
    🔴 Recording...
  </p>
</div>
        <p
          style={{
            color: "#ffd166",
            fontWeight: "bold",
            marginBottom: "15px",
          }}
        >
          ⚠️ Full Screen Mode Enabled
        </p>
        <p
  style={{
    color: "red",
    fontWeight: "bold",
    marginBottom: "10px",
  }}
>
  Warnings: {warningCount}
</p>
<button
  onClick={() => setDarkMode(!darkMode)}
  style={{
    marginBottom: "15px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    background: "#00f5ff",
  }}
>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>
        {/* TITLE */}
        <select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  style={{
    padding: "10px",
    borderRadus: "10px",
    marginBottom: "20px",
    fontWeight: "bold",
  }}
>
  <option>HR</option>
  <option>Frontend</option>
  <option>AIML</option>
</select>
        <h1
          style={{
            fontSize: "55px",
            marginBottom: "20px",
          }}
        >
          AI Interview
        </h1>

        {/* PROGRESS BAR */}
        <div
          style={{
            width: "100%",
            height: "12px",
            background: "rgba(255,255,255,0.2)",
            borderRadius: "20px",
            overflow: "hidden",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: `${
                ((currentQuestion + 1) / questions.length) * 100
              }%`,
              height: "100%",
              background: "#00f5ff",
              transition: "0.5s",
              boxShadow: "0px 0px 15px #00f5ff",
            }}
          />
        </div>

        <h2>
          Question {currentQuestion + 1}/{questions.length}
        </h2>

        <h2 style={{ color: "#ffd166" }}>
          ⏳ Time Left: {Math.floor(timeLeft / 60)}: {String(timeLeft % 60).padStart(2, "0")}
        </h2>

        <h2 style={{ marginTop: "25px" }}>
  {questions[currentQuestion]}
</h2>

{currentQuestion === questions.length - 1 && (
  <div style={{ marginTop: "20px" }}>
    
    <h3>💻 Coding Round</h3>

    <p>
      Write JavaScript code to reverse a string.
    </p>

    <textarea
      value={codingAnswer}
      onChange={(e) =>
        setCodingAnswer(e.target.value)
      }
      placeholder="Write your code here..."
      style={{
        width: "80%",
        height: "150px",
        marginTop: "10px",
        borderRadius: "10px",
        padding: "10px",
        fontSize: "16px",
      }}
    />
    <button
  onClick={() => {
    try {
      const result = eval(codingAnswer);
      setCodeOutput(String(result));
    } catch (error) {
      setCodeOutput("Error in code");
    }
  }}
  style={{
    marginTop: "15px",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    background: "#00f5ff",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  ▶ Run Code
</button>
<p style={{ marginTop: "15px", fontWeight: "bold" }}>
  Output: {codeOutput}
</p>
  </div>
)}
        {/* INPUT + MIC */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "25px",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            placeholder="Type your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            style={{
              width: "70%",
              padding: "16px",
              borderRadius: "12px",
              border: "none",
              outline: "none",
              fontSize: "16px",
              background: "#1e293b",
              color: "white",
            }}
          />

          <button
            onClick={startListening}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              border: "none",
              background: "#00f5ff",
              fontSize: "24px",
              cursor: "pointer",
              boxShadow: "0px 0px 15px #00f5ff",
            }}
          >
            🎤
          </button>
        </div>

        {/* NEXT BUTTON */}
        <button
          onClick={nextQuestion}
          style={{
            marginTop: "30px",
            padding: "15px 35px",
            border: "none",
            borderRadius: "12px",
            background: "#00f5ff",
            color: "black",
            fontWeight: "bold",
            fontSize: "18px",
            cursor: "pointer",
            boxShadow: "0px 0px 20px #00f5ff",
          }}
        >
          Next Question
        </button>
      </div>
    </div>
  );
}

export default Interview;