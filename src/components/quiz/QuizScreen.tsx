import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Question } from './types';

interface QuizScreenProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (questionId: number, optionId: string) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ 
  question, 
  currentQuestion, 
  totalQuestions, 
  onAnswer 
}) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-3xl mx-auto shadow-xl border-0 bg-white/90 backdrop-blur">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {question.category}
            </span>
            <span className="text-sm text-gray-500">
              {currentQuestion + 1} из {totalQuestions}
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
                onClick={() => onAnswer(question.id, option.id)}
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
};

export default QuizScreen;