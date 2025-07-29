import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { QuizResult, PersonalProfile } from './types';

interface ResultsScreenProps {
  results: QuizResult[];
  personalProfile: PersonalProfile | null;
  onRestart: () => void;
  onSave: () => void;
  onExport: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  results,
  personalProfile,
  onRestart,
  onSave,
  onExport
}) => {
  const averageScore = results.reduce((sum, result) => sum + result.percentage, 0) / results.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
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

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button 
            onClick={onRestart}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Icon name="RotateCcw" size={20} className="mr-2" />
            Пройти снова
          </Button>
          
          <Button 
            onClick={onSave}
            variant="outline"
            size="lg"
            className="px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 border-blue-200 hover:border-blue-300"
          >
            <Icon name="Save" size={20} className="mr-2" />
            Сохранить
          </Button>
          
          <Button 
            onClick={onExport}
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
};

export default ResultsScreen;