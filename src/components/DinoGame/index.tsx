import React, { useState, useEffect, useRef } from 'react';
import { Dinosaur } from './Dinosaur';
import { Obstacle } from './Obstacle';
import { ScoreBoard } from './ScoreBoard';
import { GameOver } from './GameOver';

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

      // Reiniciar la posición del obstáculo cuando salga de la pantalla
      if (cactus.right < 0) {
        cactusRef.current.style.right = '-20px'; // Reinicia la posición
      }

      // Comprobación de colisión
      if (
        dino.right - 10 > cactus.left &&
        dino.left + 10 < cactus.right &&
        dino.bottom - 10 > cactus.top
      ) {
        setGameOver(true);
        setHighScore((prev) => Math.max(prev, score));
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

  const resetGame = (e: React.MouseEvent) => {
    e.stopPropagation();
    setGameOver(false);
    setScore(0);
    setIsJumping(false);
    setShowInstructions(true);
    if (cactusRef.current) {
      cactusRef.current.style.right = '-20px'; // Reinicia la posición del obstáculo
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      handleJump();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isJumping, gameOver]);

  return (
    <div
      ref={gameRef}
      onClick={handleJump}
      className="w-full h-32 border-b-2 border-white relative cursor-pointer overflow-hidden"
    >
      <ScoreBoard score={score} highScore={highScore} />

      {gameOver && <GameOver onReset={resetGame} />}

      <Dinosaur ref={dinoRef} isJumping={isJumping} />

      {!gameOver && <Obstacle ref={cactusRef} />}

      {showInstructions && (
        <div className="absolute bottom-2 left-4 text-xs text-gray-400">
          Press SPACE to jump
        </div>
      )}
    </div>
  );
};
