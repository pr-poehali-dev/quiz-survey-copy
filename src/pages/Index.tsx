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
  recommendations: string[];
  strengths: string[];
  developmentAreas: string[];
}

interface PersonalProfile {
  dominantTrait: string;
  personalityType: string;
  careerPath: string[];
  overallRecommendations: string[];
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'quiz' | 'results'>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [results, setResults] = useState<QuizResult[]>([]);
  const [personalProfile, setPersonalProfile] = useState<PersonalProfile | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      text: "Как вы предпочитаете проводить свободное время?",
      category: "Лидерство",
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
      category: "Гибкость",
      options: [
        { id: "a", text: "Приветствую новое", score: 4 },
        { id: "b", text: "Принимаю с осторожностью", score: 3 },
        { id: "c", text: "Предпочитаю стабильность", score: 2 },
        { id: "d", text: "Избегаю перемен", score: 1 }
      ]
    },
    {
      id: 6,
      text: "Как вы предпочитаете работать?",
      category: "Коммуникации",
      options: [
        { id: "a", text: "В команде, обсуждая идеи", score: 4 },
        { id: "b", text: "Самостоятельно, но с консультациями", score: 3 },
        { id: "c", text: "Полностью самостоятельно", score: 2 },
        { id: "d", text: "Под чётким руководством", score: 1 }
      ]
    },
    {
      id: 7,
      text: "Какой тип задач вас больше вдохновляет?",
      category: "Креативность",
      options: [
        { id: "a", text: "Творческие и нестандартные", score: 4 },
        { id: "b", text: "Аналитические и сложные", score: 3 },
        { id: "c", text: "Организационные", score: 2 },
        { id: "d", text: "Повторяющиеся и предсказуемые", score: 1 }
      ]
    },
    {
      id: 8,
      text: "Как вы реагируете на стресс?",
      category: "Устойчивость",
      options: [
        { id: "a", text: "Мобилизуюсь и работаю эффективнее", score: 4 },
        { id: "b", text: "Остаюсь спокойным и сосредоточенным", score: 3 },
        { id: "c", text: "Немного волнуюсь, но справляюсь", score: 2 },
        { id: "d", text: "Теряюсь и может паниковать", score: 1 }
      ]
    },
    {
      id: 9,
      text: "Какой стиль обучения вам ближе?",
      category: "Обучаемость",
      options: [
        { id: "a", text: "Практика и эксперименты", score: 4 },
        { id: "b", text: "Обсуждение с другими", score: 3 },
        { id: "c", text: "Чтение и самостоятельное изучение", score: 2 },
        { id: "d", text: "Лекции и структурированные курсы", score: 1 }
      ]
    },
    {
      id: 10,
      text: "Как вы оцениваете успех?",
      category: "Целеустремлённость",
      options: [
        { id: "a", text: "По достижению конкретных целей", score: 4 },
        { id: "b", text: "По личностному росту и развитию", score: 3 },
        { id: "c", text: "По признанию окружающих", score: 2 },
        { id: "d", text: "По отсутствию проблем", score: 1 }
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
      let recommendations: string[] = [];
      let strengths: string[] = [];
      let developmentAreas: string[] = [];
      
      const categoryData = getCategoryAnalysis(category, percentage);
      description = categoryData.description;
      recommendations = categoryData.recommendations;
      strengths = categoryData.strengths;
      developmentAreas = categoryData.developmentAreas;
      
      return {
        category,
        score: Math.round(avgScore * 10) / 10,
        percentage: Math.round(percentage),
        description,
        recommendations,
        strengths,
        developmentAreas
      };
    });
    
    // Создаём персональный профиль
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
  
  const getCategoryAnalysis = (category: string, percentage: number) => {
    const analyses = {
      "Лидерство": {
        high: {
          description: "Вы обладаете ярко выраженными лидерскими качествами.",
          recommendations: ["Рассмотрите руководящие позиции", "Участвуйте в проектах-инициативах", "Развивайте навыки менторства"],
          strengths: ["Инициативность", "Способность вдохновлять", "Стратегическое мышление"],
          developmentAreas: ["Делегирование полномочий"]
        },
        medium: {
          description: "У вас есть потенциал для развития лидерских качеств.",
          recommendations: ["Принимайте на себя больше ответственности", "Практикуйте публичные выступления"],
          strengths: ["Готовность к росту", "Открытость к обучению"],
          developmentAreas: ["Коммуникация", "Уверенность"]
        },
        low: {
          description: "Лидерство не является вашей сильной стороной.",
          recommendations: ["Сосредоточьтесь на экспертности", "Развивайте специалистские навыки"],
          strengths: ["Командная работа", "Надёжность"],
          developmentAreas: ["Уверенность", "Инициативность"]
        }
      },
      "Карьера": {
        high: {
          description: "Вы чётко понимаете свои профессиональные цели.",
          recommendations: ["Создайте 5-летний план карьеры", "Развивайте профессиональную сеть"],
          strengths: ["Целеустремлённость", "Профессионализм"],
          developmentAreas: ["Баланс работа-личная жизнь"]
        },
        medium: {
          description: "У вас сбалансированный подход к карьере.",
          recommendations: ["Определите приоритеты", "Изучите рынок труда"],
          strengths: ["Гибкость", "Открытость"],
          developmentAreas: ["Конкретность целей"]
        },
        low: {
          description: "Карьера не является вашим приоритетом.",
          recommendations: ["Сосредоточьтесь на личном счастье", "Найдите своё полицание"],
          strengths: ["Личностные ценности", "Баланс"],
          developmentAreas: ["Профессиональная ориентация"]
        }
      },
      // Добавляем анализ для всех остальных категорий...
      "Мышление": {
        high: {
          description: "Вы обладаете высокоразвитыми аналитическими способностями.",
          recommendations: ["Развивайте навыки стратегического планирования", "Изучайте сложные проблемы"],
          strengths: ["Логика", "Критическое мышление"],
          developmentAreas: ["Интуитивность"]
        },
        medium: {
          description: "У вас сбалансированный аппарат мышления.",
          recommendations: ["Развивайте критическое мышление", "Практикуйте медитацию"],
          strengths: ["Гибкость мышления", "Открытость"],
          developmentAreas: ["Концентрация"]
        },
        low: {
          description: "Мышление - это область для развития.",
          recommendations: ["Читайте больше книг", "Решайте логические задачи"],
          strengths: ["Интуиция", "Потенциал роста"],
          developmentAreas: ["Логика", "Аналитика"]
        }
      }
    };
    
    const level = percentage >= 75 ? 'high' : percentage >= 50 ? 'medium' : 'low';
    const defaultAnalysis = {
      description: "Результат в пределах нормы.",
      recommendations: ["Продолжайте развиваться"],
      strengths: ["Потенциал к росту"],
      developmentAreas: ["Общее развитие"]
    };
    
    return analyses[category]?.[level] || defaultAnalysis;
  };
  
  const generatePersonalProfile = (results: QuizResult[]): PersonalProfile => {
    // Определяем доминирующую черту
    const sortedResults = [...results].sort((a, b) => b.percentage - a.percentage);
    const dominantTrait = sortedResults[0]?.category || "Неопределён";
    
    // Определяем тип личности
    const averageScore = results.reduce((sum, r) => sum + r.percentage, 0) / results.length;
    let personalityType = "";
    
    if (averageScore >= 80) personalityType = "Лидер-Инноватор";
    else if (averageScore >= 65) personalityType = "Стратег-Аналитик";
    else if (averageScore >= 50) personalityType = "Командный игрок";
    else personalityType = "Исполнитель-Профессионал";
    
    // Карьерные пути
    const careerPaths = {
      "Лидерство": ["Менеджмент", "Предпринимательство", "Консалтинг"],
      "Карьера": ["Корпоративные позиции", "Продажи", "Маркетинг"],
      "Мышление": ["Аналитика", "Наука", "ИТ-сфера"],
      "Креативность": ["Дизайн", "Реклама", "Медиа"]
    };
    
    const careerPath = careerPaths[dominantTrait] || ["Универсальные специальности"];
    
    // Общие рекомендации
    const overallRecommendations = [
      "Сосредоточьтесь на развитии своих сильных сторон",
      "Постепенно работайте над областями для развития",
      "Не бойтесь выходить из зоны комфорта",
      "Обращайтесь за обратной связью к коллегам и менторам"
    ];
    
    return {
      dominantTrait,
      personalityType,
      careerPath,
      overallRecommendations
    };
  };
  
  const exportResults = () => {
    const data = {
      personalProfile,
      results,
      timestamp: new Date().toLocaleString('ru-RU'),
      summary: {
        totalQuestions: questions.length,
        averageScore: Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length)
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-results-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const saveToLocalStorage = () => {
    const data = {
      personalProfile,
      results,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('quiz-results', JSON.stringify(data));
    alert('Результаты сохранены!');
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
              Пройдите полный психологический анализ личности и получите детальные рекомендации по карьерному росту и личностному развитию. 
              10 вопросов по 8 категориям для максимально точного результата.
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
                  <span>10 вопросов</span>
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
        <div className="max-w-6xl mx-auto">
          {/* Персональный профиль */}
          {personalProfile && (
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur mb-6">
              <CardHeader className="text-center">
                <div className="mb-4">
                  <Icon name="User" size={64} className="mx-auto text-blue-600 mb-4" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  Ваш психологический профиль
                </CardTitle>
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  <div className="text-center">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">Тип личности</h3>
                    <p className="text-blue-600 font-bold text-xl">{personalProfile.personalityType}</p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">Доминирующая черта</h3>
                    <p className="text-green-600 font-bold text-xl">{personalProfile.dominantTrait}</p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">Общий балл</h3>
                    <p className="text-purple-600 font-bold text-xl">{Math.round(averageScore)}%</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          )}

          {/* Карьерные рекомендации */}
          {personalProfile && (
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur mb-6">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Icon name="Target" size={24} className="text-blue-600" />
                  Карьерные направления
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-3">Подходящие области:</h3>
                    <div className="space-y-2">
                      {personalProfile.careerPath.map((path, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Icon name="CheckCircle" size={16} className="text-green-500" />
                          <span className="text-gray-700">{path}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-3">Общие рекомендации:</h3>
                    <div className="space-y-2">
                      {personalProfile.overallRecommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Icon name="Lightbulb" size={16} className="text-yellow-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Детальные результаты */}
          <div className="grid gap-6 md:grid-cols-2">
            {results.map((result, index) => (
              <Card key={result.category} className="shadow-lg border-0 bg-white/90 backdrop-blur hover:shadow-xl transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Icon name="BarChart3" size={20} className="text-blue-600" />
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
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {result.description}
                    </p>
                    
                    {/* Сильные стороны */}
                    <div className="mb-3">
                      <h4 className="font-semibold text-sm text-green-700 mb-2 flex items-center gap-1">
                        <Icon name="TrendingUp" size={14} />
                        Сильные стороны:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {result.strengths.map((strength, idx) => (
                          <span key={idx} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Области для развития */}
                    <div className="mb-3">
                      <h4 className="font-semibold text-sm text-orange-700 mb-2 flex items-center gap-1">
                        <Icon name="TrendingDown" size={14} />
                        Развитие:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {result.developmentAreas.map((area, idx) => (
                          <span key={idx} className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Рекомендации */}
                    <div>
                      <h4 className="font-semibold text-sm text-blue-700 mb-2 flex items-center gap-1">
                        <Icon name="Lightbulb" size={14} />
                        Рекомендации:
                      </h4>
                      <ul className="space-y-1">
                        {result.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Кнопки действий */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button 
              onClick={restartQuiz}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Icon name="RotateCcw" size={20} className="mr-2" />
              Пройти снова
            </Button>
            
            <Button 
              onClick={saveToLocalStorage}
              variant="outline"
              size="lg"
              className="px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 border-blue-200 hover:border-blue-300"
            >
              <Icon name="Save" size={20} className="mr-2" />
              Сохранить
            </Button>
            
            <Button 
              onClick={exportResults}
              variant="outline"
              size="lg"
              className="px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 border-green-200 hover:border-green-300 text-green-700 hover:text-green-800"
            >
              <Icon name="Download" size={20} className="mr-2" />
              Экспорт
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;