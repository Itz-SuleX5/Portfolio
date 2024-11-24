import React, { useEffect, useState } from 'react';

interface ObstacleProps {
  ref: React.RefObject<HTMLDivElement>;
  speed?: number;
  gameOver?: boolean;
}

type ObstacleType = '🌵' | '🌵🌵' | '🪨' | '🌲';
const OBSTACLES: ObstacleType[] = ['🌵', '🌵🌵', '🪨', '🌲'];
const SPEEDS = [1.5, 2, 2.5] as const;

export const Obstacle = React.forwardRef<HTMLDivElement, ObstacleProps>(
  ({ speed = 2, gameOver = false }, ref) => {
    const [currentObstacle, setCurrentObstacle] = useState<ObstacleType>('🌵');
    const [currentSpeed, setCurrentSpeed] = useState(speed);

    // Función para generar un nuevo obstáculo aleatorio
    const generateNewObstacle = () => {
      const randomObstacle =
        OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)];
      const randomSpeed = SPEEDS[Math.floor(Math.random() * SPEEDS.length)];
      setCurrentObstacle(randomObstacle);
      setCurrentSpeed(randomSpeed);
    };

    // Efecto para detectar cuando el obstáculo sale de la pantalla
    useEffect(() => {
      if (gameOver) return;

      const handleAnimation = (event: AnimationEvent) => {
        if (
          event.animationName === 'moveLeft' &&
          event.type === 'animationend'
        ) {
          generateNewObstacle();
        }
      };

      const element = ref as React.RefObject<HTMLDivElement>;
      element.current?.addEventListener('animationend', handleAnimation);

      return () => {
        element.current?.removeEventListener('animationend', handleAnimation);
      };
    }, [gameOver, ref]);

    // Estilo personalizado para cada tipo de obstáculo
    const getObstacleStyle = () => {
      switch (currentObstacle) {
        case '🌵🌵':
          return 'scale-110';
        case '🪨':
          return 'scale-90';
        case '🌲':
          return 'scale-125';
        default:
          return '';
      }
    };

    return (
      <>
        <style>
          {`
            @keyframes moveLeft {
              from {
                transform: translateX(0);
              }
              to {
                transform: translateX(-100vw);
              }
            }
            
            .obstacle-container {
              animation: moveLeft ${currentSpeed}s linear;
            }
          `}
        </style>
        <div
          ref={ref}
          className={`absolute bottom-0 obstacle-container ${getObstacleStyle()}`}
          style={{
            right: '-20px',
          }}
        >
          {currentObstacle}
        </div>
      </>
    );
  }
);

// Asignar un nombre para las DevTools de React
Obstacle.displayName = 'Obstacle';
