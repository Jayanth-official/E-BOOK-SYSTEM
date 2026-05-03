import React, { useState } from 'react';
import { ClipboardCheck, Trophy, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';

const QUESTIONS = [
  { id: 1, q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink Text Management Language", "Home Tool Markup Language"], correct: 0 },
  { id: 2, q: "Which property is used to change the background color in CSS?", options: ["color", "bgcolor", "background-color", "canvas-color"], correct: 2 },
  { id: 3, q: "What is the correct way to write a JavaScript array?", options: ["var colors = (1:'red', 2:'blue')", "var colors = ['red', 'green', 'blue']", "var colors = 'red', 'green', 'blue'", "var colors = {red, green, blue}"], correct: 1 },
  { id: 4, q: "Which tag is used to define an unordered list in HTML?", options: ["<ol>", "<li>", "<ul>", "<list>"], correct: 2 },
  { id: 5, q: "Inside which HTML element do we put the JavaScript?", options: ["<js>", "<scripting>", "<script>", "<javascript>"], correct: 2 },
  { id: 6, q: "How do you write 'Hello World' in an alert box?", options: ["msg('Hello World')", "alertBox('Hello World')", "msgBox('Hello World')", "alert('Hello World')"], correct: 3 },
  { id: 7, q: "How do you create a function in JavaScript?", options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "new function()"], correct: 0 },
  { id: 8, q: "How do you call a function named 'myFunction'?", options: ["call myFunction()", "myFunction()", "call function myFunction()", "start myFunction()"], correct: 1 },
  { id: 9, q: "How to write an IF statement in JavaScript?", options: ["if i = 5 then", "if i == 5 then", "if (i == 5)", "if i = 5"], correct: 2 },
  { id: 10, q: "How does a FOR loop start?", options: ["for (i <= 5; i++)", "for i = 1 to 5", "for (i = 0; i <= 5; i++)", "for (i = 0; i <= 5)"], correct: 2 },
  { id: 11, q: "Which event occurs when the user clicks on an HTML element?", options: ["onmouseover", "onclick", "onchange", "onmouseclick"], correct: 1 },
  { id: 12, q: "How do you declare a JavaScript variable?", options: ["v carName", "variable carName", "var carName", "new carName"], correct: 2 },
  { id: 13, q: "Which operator is used to assign a value to a variable?", options: ["*", "=", "-", "x"], correct: 1 },
  { id: 14, q: "What will the following code return: Boolean(10 > 9)", options: ["NaN", "false", "true", "error"], correct: 2 },
  { id: 15, q: "Is JavaScript case-sensitive?", options: ["No", "Yes", "Only in strings", "Only in functions"], correct: 1 },
  { id: 16, q: "Which CSS property controls the text size?", options: ["font-style", "text-size", "font-size", "text-style"], correct: 2 },
  { id: 17, q: "What is the default value of the position property in CSS?", options: ["relative", "fixed", "absolute", "static"], correct: 3 },
  { id: 18, q: "How do you make the text bold in CSS?", options: ["font:bold", "font-weight:bold", "style:bold", "text-decoration:bold"], correct: 1 },
  { id: 19, q: "Which HTML attribute is used to define inline styles?", options: ["class", "font", "style", "styles"], correct: 2 },
  { id: 20, q: "Which HTML tag is used to define an internal style sheet?", options: ["<css>", "<script>", "<style>", "<link>"], correct: 2 },
  { id: 21, q: "Which is the correct CSS syntax?", options: ["{body:color=black;}", "body:color=black;", "body {color: black;}", "{body;color:black;}"], correct: 2 },
  { id: 22, q: "How do you insert a comment in a CSS file?", options: ["// this is a comment", "/* this is a comment */", "' this is a comment", "// this is a comment //"], correct: 1 },
  { id: 23, q: "Which property is used to change the left margin of an element?", options: ["margin-left", "padding-left", "indent", "spacing-left"], correct: 0 },
  { id: 24, q: "How do you select an element with id 'demo'?", options: ["demo", ".demo", "#demo", "*demo"], correct: 2 },
  { id: 25, q: "How do you select elements with class name 'test'?", options: ["test", ".test", "#test", "*test"], correct: 1 },
  { id: 26, q: "What is the correct HTML for referring to an external style sheet?", options: ["<style src='mystyle.css'>", "<link rel='stylesheet' type='text/css' href='mystyle.css'>", "<stylesheet>mystyle.css</stylesheet>", "<link href='mystyle.css'>"], correct: 1 },
  { id: 27, q: "Which HTML element is used to specify a footer for a document or section?", options: ["<bottom>", "<section>", "<footer>", "<aside>"], correct: 2 },
  { id: 28, q: "What is the correct HTML for adding a background color?", options: ["<body bg='yellow'>", "<body style='background-color:yellow;'>", "<background>yellow</background>", "<body background='yellow'>"], correct: 1 },
  { id: 29, q: "Choose the correct HTML element for the largest heading:", options: ["<heading>", "<h6>", "<h1>", "<head>"], correct: 2 },
  { id: 30, q: "What is the correct HTML for creating a hyperlink?", options: ["<a href='http://www.google.com'>Google</a>", "<a>http://www.google.com</a>", "<a url='http://www.google.com'>Google</a>", "<a name='http://www.google.com'>Google</a>"], correct: 0 },
];

export default function ExamPortal() {
  const [currentStep, setCurrentStep] = useState(0); // 0: start, 1: exam, 2: result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleAnswer = (optionIdx) => {
    setAnswers({ ...answers, [currentQuestion]: optionIdx });
  };

  const nextQuestion = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishExam();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishExam = () => {
    let finalScore = 0;
    QUESTIONS.forEach((q, idx) => {
      if (answers[idx] === q.correct) {
        finalScore++;
      }
    });
    setScore(finalScore);
    setCurrentStep(2);
  };

  const resetExam = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setScore(0);
    setCurrentStep(0);
  };

  const getGrade = (s) => {
    const percentage = (s / QUESTIONS.length) * 100;
    if (percentage >= 90) return { label: 'A+', color: '#10b981' };
    if (percentage >= 80) return { label: 'A', color: '#10b981' };
    if (percentage >= 70) return { label: 'B', color: '#3b82f6' };
    if (percentage >= 60) return { label: 'C', color: '#f59e0b' };
    if (percentage >= 50) return { label: 'D', color: '#ef4444' };
    return { label: 'F', color: '#ef4444' };
  };

  return (
    <div className="page-overlay" style={{ justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)' }}>
      <div className="glass-panel slide-up" style={{ padding: '2.5rem', width: '100%', maxWidth: '700px', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
        
        {/* Start Screen */}
        {currentStep === 0 && (
          <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>
            <div>
              <ClipboardCheck size={64} color="var(--primary)" style={{ margin: '0 auto 1.5rem' }} />
              <h1 className="text-gradient" style={{ fontSize: '2.5rem' }}>Final Assessment</h1>
              <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', fontSize: '1.1rem' }}>
                Test your knowledge with our comprehensive exam.
              </p>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'left', background: 'rgba(255,255,255,0.02)' }}>
              <h3 style={{ marginBottom: '0.8rem' }}>Exam Rules:</h3>
              <ul style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.2rem' }}>
                <li>30 Multiple Choice Questions</li>
                <li>Each question has only one correct answer</li>
                <li>You can navigate back and forth between questions</li>
                <li>Your final grade will be displayed at the end</li>
              </ul>
            </div>
            <button className="btn btn-primary" onClick={() => setCurrentStep(1)} style={{ alignSelf: 'center', padding: '12px 40px', fontSize: '1.1rem' }}>
              Start Examination
            </button>
          </div>
        )}

        {/* Exam Screen */}
        {currentStep === 1 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                Question {currentQuestion + 1} of {QUESTIONS.length}
              </span>
              <div style={{ width: '200px', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%`, 
                  height: '100%', 
                  background: 'var(--primary)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '2rem', lineHeight: '1.4' }}>
                {QUESTIONS[currentQuestion].q}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {QUESTIONS[currentQuestion].options.map((opt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    style={{
                      padding: '1rem 1.5rem',
                      borderRadius: '12px',
                      background: answers[currentQuestion] === idx ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${answers[currentQuestion] === idx ? 'var(--primary)' : 'var(--glass-border)'}`,
                      color: 'var(--text-primary)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontSize: '1rem',
                      fontFamily: 'inherit'
                    }}
                  >
                    <span style={{ 
                      display: 'inline-flex', 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '50%', 
                      background: answers[currentQuestion] === idx ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
              <button className="btn btn-secondary" onClick={prevQuestion} disabled={currentQuestion === 0}>
                <ChevronLeft size={18} /> Previous
              </button>
              <button className="btn btn-primary" onClick={nextQuestion}>
                {currentQuestion === QUESTIONS.length - 1 ? 'Finish Exam' : 'Next Question'} <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Result Screen */}
        {currentStep === 2 && (
          <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>
            <div>
              <Trophy size={64} color="#f59e0b" style={{ margin: '0 auto 1.5rem' }} />
              <h1 className="text-gradient" style={{ fontSize: '2.5rem' }}>Assessment Complete!</h1>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', margin: '1rem 0' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Your Score</p>
                <h2 style={{ fontSize: '3rem' }}>{score}<span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>/30</span></h2>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Final Grade</p>
                <h2 style={{ fontSize: '3.5rem', color: getGrade(score).color }}>{getGrade(score).label}</h2>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
              <p style={{ color: 'var(--text-secondary)' }}>
                {score >= 25 ? "Outstanding performance! You have mastered the core concepts." : 
                 score >= 18 ? "Great job! You have a solid understanding of the material." :
                 "Good effort! Consider reviewing the course materials for a better score next time."}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={resetExam}>
                <RotateCcw size={18} /> Retake Exam
              </button>
              <button className="btn btn-primary" onClick={() => window.location.href = '/dashboard'}>
                Back to Dashboard
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
