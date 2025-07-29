import { QuizResult, PersonalProfile } from './types';

export const getCategoryAnalysis = (category: string, percentage: number) => {
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
        recommendations: ["Сосредоточьтесь на личном счастье", "Найдите своё призвание"],
        strengths: ["Личностные ценности", "Баланс"],
        developmentAreas: ["Профессиональная ориентация"]
      }
    },
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

export const generatePersonalProfile = (results: QuizResult[]): PersonalProfile => {
  const sortedResults = [...results].sort((a, b) => b.percentage - a.percentage);
  const dominantTrait = sortedResults[0]?.category || "Неопределён";
  
  const averageScore = results.reduce((sum, r) => sum + r.percentage, 0) / results.length;
  let personalityType = "";
  
  if (averageScore >= 80) personalityType = "Лидер-Инноватор";
  else if (averageScore >= 65) personalityType = "Стратег-Аналитик";
  else if (averageScore >= 50) personalityType = "Командный игрок";
  else personalityType = "Исполнитель-Профессионал";
  
  const careerPaths = {
    "Лидерство": ["Менеджмент", "Предпринимательство", "Консалтинг"],
    "Карьера": ["Корпоративные позиции", "Продажи", "Маркетинг"],
    "Мышление": ["Аналитика", "Наука", "ИТ-сфера"],
    "Креативность": ["Дизайн", "Реклама", "Медиа"]
  };
  
  const careerPath = careerPaths[dominantTrait] || ["Универсальные специальности"];
  
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

export const exportResults = (personalProfile: PersonalProfile | null, results: QuizResult[], questions: any[]) => {
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

export const saveToLocalStorage = (personalProfile: PersonalProfile | null, results: QuizResult[]) => {
  const data = {
    personalProfile,
    results,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('quiz-results', JSON.stringify(data));
  alert('Результаты сохранены!');
};