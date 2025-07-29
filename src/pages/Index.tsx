import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Question {
  id: number;
  text: string;
  options: { id: string; text: string; score: number }[];
  category: string;
}

interface QuizResult {
  category: string;
  score: number;
  percentage: number;
  description: string;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'quiz' | 'results'>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [results, setResults] = useState<QuizResult[]>([]);

  const questions: Question[] = [
    {
      id: 1,
      text: "Как вы предпочитаете проводить свободное время?",
      category: "Личность",
      options: [
        { id: "a", text: "Читаю книги или изучаю что-то новое", score: 3 },
        { id: "b", text: "Встречаюсь с друзьями", score: 2 },
        { id: "c", text: "Занимаюсь спортом или активным отдыхом", score: 4 },
        { id: "d", text: "Смотрю фильмы или играю в игры", score: 1 }
      ]
    },
    {
      id: 2,
      text: "Что для вас важнее всего в работе?",
      category: "Карьера",
      options: [
        { id: "a", text: "Стабильность и предсказуемость", score: 2 },
        { id: "b", text: "Творческая свобода", score: 4 },
        { id: "c", text: "Высокая зарплата", score: 1 },
        { id: "d", text: "Возможности для роста", score: 3 }
      ]
    },
    {
      id: 3,
      text: "Как вы принимаете важные решения?",
      category: "Мышление",
      options: [
        { id: "a", text: "Полагаюсь на интуицию", score: 3 },
        { id: "b", text: "Анализирую все факты", score: 4 },
        { id: "c", text: "Советуюсь с близкими", score: 2 },
        { id: "d", text: "Принимаю быстро, не затягивая", score: 1 }
      ]
    },
    {
      id: 4,
      text: "Что вас больше всего мотивирует?",
      category: "Мотивация",
      options: [
        { id: "a", text: "Признание окружающих", score: 2 },
        { id: "b", text: "Личные достижения", score: 4 },
        { id: "c", text: "Помощь другим людям", score: 3 },
        { id: "d", text: "Новые впечатления", score: 1 }
      ]
    },
    {
      id: 5,
      text: "Как вы относитесь к изменениям?",
      category: "Адаптация",
      options: [
        { id: "a", text: "Приветствую новое", score: 4 },
        { id: "b", text: "Принимаю с осторожностью", score: 3 },
        { id: "c", text: "Предпочитаю стабильность", score: 2 },
        { id: "d", text: "Избегаю перемен", score: 1 }
      ]
    }
  ];

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
      
      let description = "";
      if (percentage >= 80) description = "Отличный результат! Вы проявляете высокие показатели в этой области.";
      else if (percentage >= 60) description = "Хороший результат. Есть потенциал для развития.";
      else if (percentage >= 40) description = "Средний уровень. Стоит обратить внимание на эту сферу.";
      else description = "Есть над чем поработать в этой области.";
      
      return {
        category,
        score: Math.round(avgScore * 10) / 10,
        percentage: Math.round(percentage),
        description
      };
    });
    
    setResults(results);
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
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (currentScreen === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white/90 backdrop-blur">
          <CardHeader className="text-center pb-6">
            <div className="mb-6">
              <Icon name="ClipboardList" size={64} className="mx-auto text-blue-600 mb-4" />
            </div>
            <CardTitle className="text-4xl font-bold text-gray-900 mb-4">
              Квиз-Опросник
            </CardTitle>
            <p className="text-lg text-gray-600 leading-relaxed">
              Пройдите интересный опрос и узнайте больше о своих предпочтениях и особенностях личности. 
              Всего 5 вопросов, каждый из которых поможет лучше понять ваши склонности.
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  <span>3-5 минут</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={16} />
                  <span>5 вопросов</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="BarChart3" size={16} />
                  <span>Детальные результаты</span>
                </div>
              </div>
            </div>
            <Button 
              onClick={startQuiz}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Icon name="Play" size={20} className="mr-2" />
              Начать квиз
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentScreen === 'quiz') {
    const question = questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-3xl mx-auto shadow-xl border-0 bg-white/90 backdrop-blur">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {question.category}
              </span>
              <span className="text-sm text-gray-500">
                {currentQuestion + 1} из {questions.length}
              </span>
            </div>
            <Progress value={progress} className="mb-6" />
            <CardTitle className="text-2xl font-bold text-gray-900 leading-tight">
              {question.text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={option.id}
                  variant="outline"
                  onClick={() => handleAnswer(question.id, option.id)}
                  className="w-full p-6 text-left justify-start h-auto hover:bg-blue-50 hover:border-blue-200 hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 border-gray-200 bg-white"
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-gray-800 font-medium">{option.text}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentScreen === 'results') {
    const averageScore = results.reduce((sum, result) => sum + result.percentage, 0) / results.length;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur mb-6">
            <CardHeader className="text-center">
              <div className="mb-4">
                <Icon name="Trophy" size={64} className="mx-auto text-yellow-500 mb-4" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                Результаты квиза
              </CardTitle>
              <p className="text-lg text-gray-600">
                Общий балл: <span className="font-bold text-blue-600">{Math.round(averageScore)}%</span>
              </p>
            </CardHeader>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((result, index) => (
              <Card key={result.category} className="shadow-lg border-0 bg-white/90 backdrop-blur hover:shadow-xl transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Icon name="Target" size={20} className="text-blue-600" />
                    {result.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        {result.percentage}%
                      </div>
                      <div className="text-sm text-gray-500">
                        Балл: {result.score}/4
                      </div>
                    </div>
                    <Progress value={result.percentage} className="h-2" />
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {result.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              onClick={restartQuiz}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Icon name="RotateCcw" size={20} className="mr-2" />
              Пройти ещё раз
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;