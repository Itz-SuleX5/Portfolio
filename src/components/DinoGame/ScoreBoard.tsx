import React from 'react';
import { Trophy } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  highScore: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, highScore }) => {
  return (
    <div className="absolute top-2 right-4 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Trophy size={16} className="text-yellow-400" />
        <span className="text-xs">{highScore}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs">SCORE:</span>
        <span className="text-xs">{score}</span>
      </div>
    </div>
  );
};