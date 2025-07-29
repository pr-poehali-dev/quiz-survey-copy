import React, { useState } from 'react';
import WelcomeScreen from '@/components/quiz/WelcomeScreen';
import QuizScreen from '@/components/quiz/QuizScreen';
import ResultsScreen from '@/components/quiz/ResultsScreen';
import { questions } from '@/components/quiz/data';
import { getCategoryAnalysis, generatePersonalProfile, exportResults, saveToLocalStorage } from '@/components/quiz/utils';
import { ScreenType, QuizResult, PersonalProfile } from '@/components/quiz/types';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [results, setResults] = useState<QuizResult[]>([]);
  const [personalProfile, setPersonalProfile] = useState<PersonalProfile | null>(null);

  const calculateResults = () => {
    const categoryScores: {[key: string]: number} = {};
    const categoryCounts: {[key: string]: number} = {};
    
    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const selectedOption = question.options.find(opt => opt.id === answer);
        if (selectedOption) {
          if (!categoryScores[question.category]) {
            categoryScores[question.category] = 0;
            categoryCounts[question.category] = 0;
          }
          categoryScores[question.category] += selectedOption.score;
          categoryCounts[question.category] += 1;
        }
      }
    });

    const results: QuizResult[] = Object.keys(categoryScores).map(category => {
      const avgScore = categoryScores[category] / categoryCounts[category];
      const percentage = (avgScore / 4) * 100;
      
      const categoryData = getCategoryAnalysis(category, percentage);
      
      return {
        category,
        score: Math.round(avgScore * 10) / 10,
        percentage: Math.round(percentage),
        description: categoryData.description,
        recommendations: categoryData.recommendations,
        strengths: categoryData.strengths,
        developmentAreas: categoryData.developmentAreas
      };
    });
    
    const profile = generatePersonalProfile(results);
    
    setResults(results);
    setPersonalProfile(profile);
    setCurrentScreen('results');
  };

  const handleAnswer = (questionId: number, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 300);
    } else {
      setTimeout(() => calculateResults(), 300);
    }
  };

  const startQuiz = () => {
    setCurrentScreen('quiz');
    setCurrentQuestion(0);
    setAnswers({});
  };

  const restartQuiz = () => {
    setCurrentScreen('welcome');
    setCurrentQuestion(0);
    setAnswers({});
    setResults([]);
    setPersonalProfile(null);
  };

  const handleSave = () => {
    saveToLocalStorage(personalProfile, results);
  };

  const handleExport = () => {
    exportResults(personalProfile, results, questions);
  };

  if (currentScreen === 'welcome') {
    return <WelcomeScreen onStartQuiz={startQuiz} />;
  }

  if (currentScreen === 'quiz') {
    const question = questions[currentQuestion];
    return (
      <QuizScreen 
        question={question}
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
      />
    );
  }

  if (currentScreen === 'results') {
    return (
      <ResultsScreen 
        results={results}
        personalProfile={personalProfile}
        onRestart={restartQuiz}
        onSave={handleSave}
        onExport={handleExport}
      />
    );
  }

  return null;
};

export default Index;