'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Shield, ChevronRight, CheckCircle, XCircle, Trophy,
  Share2, Zap, ArrowRight, Brain, Target, AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { SiteFooter } from '@/components/seo/SiteFooter';
import { EAACountdown } from '@/components/EAACountdown';

interface Question {
  id: number;
  question: string;
  options: { text: string; correct: boolean; explanation: string }[];
  category: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What does WCAG stand for?",
    options: [
      { text: "Web Content Accessibility Guidelines", correct: true, explanation: "WCAG is the international standard for web accessibility." },
      { text: "Website Compliance And Governance", correct: false, explanation: "WCAG actually stands for Web Content Accessibility Guidelines." },
      { text: "Web Commerce Accessibility Guide", correct: false, explanation: "WCAG actually stands for Web Content Accessibility Guidelines." },
      { text: "World Computer Access Group", correct: false, explanation: "WCAG actually stands for Web Content Accessibility Guidelines." },
    ],
    category: "Fundamentals",
  },
  {
    id: 2,
    question: "When does the European Accessibility Act (EAA) require full compliance?",
    options: [
      { text: "June 28, 2025", correct: true, explanation: "The EAA enforcement deadline is June 28, 2025 for most digital products and services." },
      { text: "January 1, 2024", correct: false, explanation: "The correct deadline is June 28, 2025." },
      { text: "December 31, 2025", correct: false, explanation: "The correct deadline is June 28, 2025." },
      { text: "There is no deadline", correct: false, explanation: "The EAA has a clear deadline of June 28, 2025." },
    ],
    category: "Legal",
  },
  {
    id: 3,
    question: "What is the minimum color contrast ratio for normal text under WCAG 2.1 AA?",
    options: [
      { text: "4.5:1", correct: true, explanation: "WCAG 2.1 AA requires a minimum 4.5:1 contrast ratio for normal text." },
      { text: "3:1", correct: false, explanation: "3:1 is the ratio for large text. Normal text requires 4.5:1." },
      { text: "7:1", correct: false, explanation: "7:1 is the AAA level requirement. AA requires 4.5:1." },
      { text: "2:1", correct: false, explanation: "2:1 is insufficient. WCAG AA requires 4.5:1 for normal text." },
    ],
    category: "Technical",
  },
  {
    id: 4,
    question: "Which HTML element should you use to label a form input?",
    options: [
      { text: "<label>", correct: true, explanation: "The <label> element explicitly associates text with form inputs for screen readers." },
      { text: "<span>", correct: false, explanation: "While you can style text with <span>, it doesn't provide semantic association." },
      { text: "<div>", correct: false, explanation: "<div> is a generic container and doesn't provide form label semantics." },
      { text: "<p>", correct: false, explanation: "<p> is for paragraphs, not form labels." },
    ],
    category: "Technical",
  },
  {
    id: 5,
    question: "What's the maximum fine per violation under the EAA?",
    options: [
      { text: "Up to €100,000 or more depending on member state", correct: true, explanation: "Fines vary by EU member state but can exceed €100,000 per violation." },
      { text: "€500", correct: false, explanation: "EAA fines are much more severe, potentially exceeding €100,000." },
      { text: "No monetary fines, just warnings", correct: false, explanation: "The EAA includes significant monetary penalties." },
      { text: "€10,000 maximum", correct: false, explanation: "Fines can be much higher, depending on the member state." },
    ],
    category: "Legal",
  },
  {
    id: 6,
    question: "What does POUR stand for in accessibility?",
    options: [
      { text: "Perceivable, Operable, Understandable, Robust", correct: true, explanation: "POUR represents the four principles of WCAG accessibility." },
      { text: "Protected, Organized, Universal, Reliable", correct: false, explanation: "The correct answer is Perceivable, Operable, Understandable, Robust." },
      { text: "Private, Open, Usable, Responsive", correct: false, explanation: "The correct answer is Perceivable, Operable, Understandable, Robust." },
      { text: "Powerful, Optimal, User-friendly, Ready", correct: false, explanation: "The correct answer is Perceivable, Operable, Understandable, Robust." },
    ],
    category: "Fundamentals",
  },
  {
    id: 7,
    question: "What percentage of websites currently fail basic accessibility tests?",
    options: [
      { text: "Over 95%", correct: true, explanation: "Studies show over 95% of websites have detectable WCAG failures." },
      { text: "About 50%", correct: false, explanation: "The reality is much worse - over 95% fail basic tests." },
      { text: "About 25%", correct: false, explanation: "Unfortunately, failure rates are much higher at over 95%." },
      { text: "Less than 10%", correct: false, explanation: "Most websites (over 95%) have accessibility failures." },
    ],
    category: "Industry",
  },
  {
    id: 8,
    question: "Which attribute should images have for accessibility?",
    options: [
      { text: "alt", correct: true, explanation: "The alt attribute provides text alternatives for screen readers." },
      { text: "title", correct: false, explanation: "While title can help, alt is required for accessibility." },
      { text: "description", correct: false, explanation: "The correct attribute is alt, not description." },
      { text: "name", correct: false, explanation: "The name attribute is not used for image accessibility." },
    ],
    category: "Technical",
  },
  {
    id: 9,
    question: "What's the primary benefit of web accessibility for businesses?",
    options: [
      { text: "All of the above", correct: true, explanation: "Accessibility helps with SEO, expands market reach, reduces legal risk, and improves overall UX." },
      { text: "Better SEO rankings", correct: false, explanation: "While true, accessibility offers many more benefits." },
      { text: "Access to 15%+ more customers", correct: false, explanation: "True, but there are additional business benefits." },
      { text: "Reduced legal risk", correct: false, explanation: "True, but there are additional business benefits." },
    ],
    category: "Business",
  },
  {
    id: 10,
    question: "Which keyboard key should users be able to use to navigate through links and forms?",
    options: [
      { text: "Tab", correct: true, explanation: "The Tab key is the standard for keyboard navigation between interactive elements." },
      { text: "Enter", correct: false, explanation: "Enter activates elements, but Tab navigates between them." },
      { text: "Space", correct: false, explanation: "Space activates buttons, but Tab navigates between elements." },
      { text: "Arrow keys", correct: false, explanation: "Arrow keys are for in-component navigation; Tab moves between elements." },
    ],
    category: "Technical",
  },
];

type Grade = 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';

function getGrade(score: number): Grade {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

function getGradeColor(grade: Grade) {
  switch (grade) {
    case 'A+':
    case 'A':
      return 'text-green-400';
    case 'B':
      return 'text-lime-400';
    case 'C':
      return 'text-yellow-400';
    case 'D':
      return 'text-orange-400';
    case 'F':
      return 'text-red-400';
  }
}

function getGradeBg(grade: Grade) {
  switch (grade) {
    case 'A+':
    case 'A':
      return 'bg-green-500/20 border-green-500/30';
    case 'B':
      return 'bg-lime-500/20 border-lime-500/30';
    case 'C':
      return 'bg-yellow-500/20 border-yellow-500/30';
    case 'D':
      return 'bg-orange-500/20 border-orange-500/30';
    case 'F':
      return 'bg-red-500/20 border-red-500/30';
  }
}

function getMessage(grade: Grade): string {
  switch (grade) {
    case 'A+':
      return "Accessibility Expert! You really know your stuff.";
    case 'A':
      return "Excellent! You have strong accessibility knowledge.";
    case 'B':
      return "Good job! You understand the basics well.";
    case 'C':
      return "Not bad, but there's room to improve your knowledge.";
    case 'D':
      return "You're learning, but should brush up on accessibility.";
    case 'F':
      return "Time to learn more about accessibility! Check out our free course.";
  }
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ questionId: number; correct: boolean }[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const question = questions[currentQuestion];
  const score = Math.round((answers.filter(a => a.correct).length / questions.length) * 100);
  const grade = getGrade(score);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = question.options[index].correct;
    setAnswers([...answers, { questionId: question.id, correct: isCorrect }]);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setQuizComplete(false);
    setEmailSubmitted(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'accessibility_quiz',
          metadata: { score, grade },
        }),
      });
    } catch {
      // Silent fail for UX
    }
    setEmailSubmitted(true);
  };

  const shareUrl = `https://inclusiv.app/quiz`;
  const shareText = `I scored ${score}% (Grade: ${grade}) on the Accessibility Knowledge Quiz! Test your knowledge:`;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold text-white">Inclusiv</span>
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-sm"
          >
            Free Scan
          </Link>
        </div>
      </header>

      {/* EAA Deadline Urgency Banner */}
      <EAACountdown variant="banner" showCTA={true} />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {!quizComplete ? (
          <>
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-400 text-sm">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-zinc-400 text-sm">{question.category}</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">{question.question}</h2>
              </div>

              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = option.correct;

                  let buttonClass = "w-full p-4 text-left rounded-xl border transition-all ";

                  if (!showResult) {
                    buttonClass += "bg-zinc-800 border-zinc-700 hover:border-indigo-500 text-white";
                  } else if (isSelected && isCorrect) {
                    buttonClass += "bg-green-500/20 border-green-500/50 text-white";
                  } else if (isSelected && !isCorrect) {
                    buttonClass += "bg-red-500/20 border-red-500/50 text-white";
                  } else if (isCorrect) {
                    buttonClass += "bg-green-500/10 border-green-500/30 text-white";
                  } else {
                    buttonClass += "bg-zinc-800/50 border-zinc-700/50 text-zinc-500";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showResult}
                      className={buttonClass}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option.text}</span>
                        {showResult && isCorrect && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showResult && selectedAnswer !== null && (
                <div className={`mt-6 p-4 rounded-xl ${
                  question.options[selectedAnswer].correct
                    ? 'bg-green-500/10 border border-green-500/20'
                    : 'bg-red-500/10 border border-red-500/20'
                }`}>
                  <p className={question.options[selectedAnswer].correct ? 'text-green-300' : 'text-red-300'}>
                    {question.options[selectedAnswer].explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Next Button */}
            {showResult && (
              <div className="text-center">
                <button
                  onClick={nextQuestion}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all"
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* Results */
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-2xl mb-6 border-2 ${getGradeBg(grade)}`}>
              <span className={`text-6xl font-bold ${getGradeColor(grade)}`}>{grade}</span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">
              You scored {score}%
            </h1>
            <p className="text-xl text-zinc-400 mb-8">{getMessage(grade)}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <p className="text-2xl font-bold text-green-400">
                  {answers.filter(a => a.correct).length}
                </p>
                <p className="text-zinc-500 text-sm">Correct</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <p className="text-2xl font-bold text-red-400">
                  {answers.filter(a => !a.correct).length}
                </p>
                <p className="text-zinc-500 text-sm">Wrong</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <p className="text-2xl font-bold text-indigo-400">{questions.length}</p>
                <p className="text-zinc-500 text-sm">Total</p>
              </div>
            </div>

            {/* Share Results */}
            <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span className="text-white font-medium">Share Your Results</span>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors"
                >
                  Share on X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors"
                >
                  LinkedIn
                </a>
                <button
                  onClick={() => navigator.clipboard.writeText(`${shareText} ${shareUrl}`)}
                  className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors"
                >
                  Copy Link
                </button>
              </div>
            </div>

            {/* Email Capture */}
            {!emailSubmitted ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8 max-w-md mx-auto">
                <h3 className="text-lg font-bold text-white mb-2">
                  {score < 70 ? 'Want to learn more?' : 'Get accessibility tips!'}
                </h3>
                <p className="text-zinc-400 text-sm mb-4">
                  Join our free 7-day accessibility course
                </p>
                <form onSubmit={handleEmailSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
                  >
                    Join
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-8 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400">Check your inbox for the first lesson!</span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restartQuiz}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all"
              >
                <Zap className="w-5 h-5" />
                Scan Your Site
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors"
              >
                Free Course
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
