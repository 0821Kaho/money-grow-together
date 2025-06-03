
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiProps {
  show: boolean;
  onComplete?: () => void;
  duration?: number;
  type?: 'celebration' | 'achievement' | 'coins' | 'stars' | 'level-up';
  intensity?: 'light' | 'medium' | 'heavy';
}

const Confetti = ({ 
  show, 
  onComplete, 
  duration = 2000, 
  type = 'celebration',
  intensity = 'medium'
}: ConfettiProps) => {
  const [particles, setParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    color: string; 
    delay: number;
    shape: string;
    size: number;
    rotation: number;
  }>>([]);

  const getParticleCount = () => {
    switch (intensity) {
      case 'light': return 15;
      case 'heavy': return 35;
      default: return 25;
    }
  };

  const getParticleConfig = () => {
    switch (type) {
      case 'coins':
        return {
          colors: ['#FFD700', '#FFA500', '#FFEB3B', '#FF8F00'],
          shapes: ['💰', '🪙', '💴', '💵'],
          sizes: [16, 20, 24]
        };
      case 'stars':
        return {
          colors: ['#FFD700', '#FFC107', '#FFEB3B', '#FFF176'],
          shapes: ['⭐', '✨', '🌟', '💫'],
          sizes: [14, 18, 22]
        };
      case 'achievement':
        return {
          colors: ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107'],
          shapes: ['🏆', '🎖️', '🥇', '🎯'],
          sizes: [16, 20, 24]
        };
      case 'level-up':
        return {
          colors: ['#9C27B0', '#E91E63', '#F44336', '#FF9800'],
          shapes: ['🚀', '⚡', '🔥', '💎'],
          sizes: [18, 22, 26]
        };
      default:
        return {
          colors: ['#F37B83', '#2BA26B', '#FFD66E', '#FF66A5'],
          shapes: ['🎉', '🎊', '🎈', '🎁'],
          sizes: [12, 16, 20]
        };
    }
  };

  useEffect(() => {
    if (show) {
      const config = getParticleConfig();
      const count = getParticleCount();
      
      const newParticles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        shape: config.shapes[Math.floor(Math.random() * config.shapes.length)],
        size: config.sizes[Math.floor(Math.random() * config.sizes.length)],
        delay: Math.random() * 0.5,
        rotation: Math.random() * 360
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onComplete, type, intensity]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute flex items-center justify-center"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                fontSize: `${particle.size}px`,
                color: particle.color,
              }}
              initial={{ 
                scale: 0, 
                y: 0, 
                opacity: 1,
                rotate: particle.rotation
              }}
              animate={{
                scale: [0, 1.2, 1],
                y: [0, -100, -200],
                opacity: [1, 1, 0],
                rotate: [particle.rotation, particle.rotation + 180, particle.rotation + 360]
              }}
              transition={{
                duration: duration / 1000,
                delay: particle.delay,
                ease: "easeOut"
              }}
              exit={{ opacity: 0 }}
            >
              {particle.shape}
            </motion.div>
          ))}
          
          {/* Background flash effect for level-up */}
          {type === 'level-up' && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 0.5 }}
            />
          )}
        </div>
      )}
    </AnimatePresence>
  );
};

export default Confetti;
