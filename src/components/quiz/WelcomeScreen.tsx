import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface WelcomeScreenProps {
  onStartQuiz: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartQuiz }) => {
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
            onClick={onStartQuiz}
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
};

export default WelcomeScreen;