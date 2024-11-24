import React from 'react';
import { RefreshCw } from 'lucide-react';

interface GameOverProps {
  onReset: (e: React.MouseEvent) => void;
}

export const GameOver: React.FC<GameOverProps> = ({ onReset }) => {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
      <div className="text-center">
        <p className="text-red-500 mb-2">GAME OVER</p>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 transition-colors pixel-border"
        >
          <RefreshCw size={16} />
          <span className="text-xs">RETRY</span>
        </button>
      </div>
    </div>
  );
};
