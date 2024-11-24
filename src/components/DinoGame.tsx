import React, { useState, useEffect, useRef } from 'react';
import { Trophy, RefreshCw } from 'lucide-react';

export const DinoGame = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  const dinoRef = useRef<HTMLDivElement>(null);
  const cactusRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrame: number;
    let scoreInterval: NodeJS.Timeout;

    const checkCollision = () => {
      if (!dinoRef.current || !cactusRef.current || gameOver) return;

      const dino = dinoRef.current.getBoundingClientRect();
      const cactus = cactusRef.current.getBoundingClientRect();

      // Reset cactus position when it moves off screen
      if (cactus.right < 0) {
        cactusRef.current.style.right = '-20px';
        cactusRef.current.style.animation = 'none';
        cactusRef.current.offsetHeight; // Trigger reflow
        cactusRef.current.style.animation = 'moveLeft 2s linear infinite';
      }

      // Collision detection
      if (
        dino.right - 15 > cactus.left &&
        dino.left + 15 < cactus.right &&
        dino.bottom - 15 > cactus.top
      ) {
        setGameOver(true);
        setHighScore((prev) => Math.max(prev, score));
        return;
      }

      animationFrame = requestAnimationFrame(checkCollision);
    };

    if (!gameOver) {
      scoreInterval = setInterval(() => {
        setScore((prev) => prev + 1);
      }, 100);

      animationFrame = requestAnimationFrame(checkCollision);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      clearInterval(scoreInterval);
    };
  }, [gameOver, score]);

  const handleJump = () => {
    if (!isJumping && !gameOver) {
      setIsJumping(true);
      setShowInstructions(false);
      setTimeout(() => setIsJumping(false), 500);
    }
  };

  const resetGame = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setGameOver(false);
    setScore(0);
    setIsJumping(false);

    // Reset cactus animation
    if (cactusRef.current) {
      cactusRef.current.style.right = '-20px';
      cactusRef.current.style.animation = 'none';
      cactusRef.current.offsetHeight;
      cactusRef.current.style.animation = 'moveLeft 2s linear infinite';
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div
      ref={gameRef}
      onClick={handleJump}
      className="w-full h-32 border-b-2 border-gray-200 relative cursor-pointer overflow-hidden bg-white dark:bg-gray-900"
    >
      <style>
        {`
          @keyframes moveLeft {
            from { transform: translateX(0); }
            to { transform: translateX(-100vw); }
          }
        `}
      </style>

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

      {gameOver && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
          <div className="text-center">
            <p className="text-red-500 mb-2">GAME OVER</p>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 transition-colors rounded"
            >
              <RefreshCw size={16} />
              <span className="text-xs">RETRY</span>
            </button>
          </div>
        </div>
      )}

      <div
        ref={dinoRef}
        className={`absolute bottom-0 left-16 w-12 h-12 transition-transform duration-500 
        ${isJumping ? '-translate-y-16' : 'translate-y-0'}`}
        style={{
          transform: `scaleX(-1) ${isJumping ? 'translateY(-4rem)' : 'translateY(0)'}`,
          marginBottom: '-25px'
        }}
      >
        🦖
      </div>

      {!gameOver && (
        <div
          ref={cactusRef}
          className="absolute bottom-0"
          style={{
            right: '-20px',
            animation: 'moveLeft 2s linear infinite',
          }}
        >
          🌵
        </div>
      )}

      {showInstructions && (
        <div className="absolute bottom-2 left-4 text-xs text-gray-400">
          Press SPACE to jump
        </div>
      )}
    </div>
  );
};
