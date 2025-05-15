
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PlantGrowthVisualProps {
  plantType: string;
  growthPercentage: number;
  health: number;
  color: string;
  name: string;
}

const PlantGrowthVisual = ({ plantType, growthPercentage, health, color, name }: PlantGrowthVisualProps) => {
  // Normalize growth percentage to 0-100 for visual purposes
  const normalizedGrowth = Math.min(100, Math.max(0, growthPercentage));
  // Health affects visual appearance (0-1)
  const normalizedHealth = Math.min(1, Math.max(0, health));
  
  const [height, setHeight] = useState(5);
  const [width, setWidth] = useState(3);
  const [branches, setBranches] = useState(0);
  const [fruits, setFruits] = useState(0);
  
  useEffect(() => {
    // Calculate visual properties based on growth and health
    const baseHeight = 5 + normalizedGrowth * 0.9; // Max height 95
    const baseWidth = 3 + normalizedGrowth * 0.07; // Max width 10
    const baseBranches = Math.floor(normalizedGrowth / 15); // A new branch every 15%
    const baseFruits = Math.floor(normalizedGrowth / 10); // A new fruit every 10%
    
    // Apply health modifier (reduces visual elements when health is low)
    setHeight(baseHeight * (0.7 + normalizedHealth * 0.3));
    setWidth(baseWidth * (0.8 + normalizedHealth * 0.2));
    setBranches(Math.max(0, Math.floor(baseBranches * normalizedHealth)));
    setFruits(Math.max(0, Math.floor(baseFruits * normalizedHealth)));
  }, [normalizedGrowth, normalizedHealth]);
  
  const renderPlant = () => {
    // Different visuals based on plant type
    switch (plantType) {
      case "savings": // Palm tree style for savings
        return (
          <div className="flex flex-col items-center">
            {/* Trunk */}
            <motion.div
              className="bg-yellow-800 rounded-md"
              style={{ 
                height: `${height}rem`, 
                width: `${width}px`, 
                opacity: normalizedHealth 
              }}
              initial={{ height: "5rem" }}
              animate={{ height: `${height}rem` }}
              transition={{ duration: 1 }}
            />
            
            {/* Leaves/Branches - only show if health > 0.3 */}
            {normalizedHealth > 0.3 && (
              <motion.div 
                className="flex flex-col items-center relative -mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[...Array(branches)].map((_, i) => (
                  <div key={i} className="relative">
                    <motion.div
                      className="absolute"
                      style={{ 
                        left: i % 2 === 0 ? `-${15 + i * 5}px` : `${15 + i * 5}px`,
                        top: `-${5 + i * 3}px`,
                        transform: i % 2 === 0 ? "rotate(-30deg)" : "rotate(30deg)",
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                    >
                      <svg height="20" width="30">
                        <path 
                          d={`M0,0 Q15,5 30,0 Q15,20 0,0`}
                          fill={color}
                          opacity={0.8 * normalizedHealth}
                        />
                      </svg>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        );
        
      case "stocks": // Flower style for stocks
        return (
          <div className="flex flex-col items-center">
            {/* Stem */}
            <motion.div
              className="bg-green-600"
              style={{ 
                height: `${height}rem`, 
                width: `${width}px`, 
                opacity: normalizedHealth 
              }}
              initial={{ height: "5rem" }}
              animate={{ height: `${height}rem` }}
              transition={{ duration: 1 }}
            />
            
            {/* Flower */}
            {normalizedHealth > 0.2 && (
              <motion.div 
                className="relative -mt-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="relative">
                  {/* Flower petals */}
                  {[...Array(Math.max(5, Math.floor(fruits * 0.8)))].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{ 
                        width: `${8 + fruits * 0.3}px`, 
                        height: `${8 + fruits * 0.3}px`,
                        backgroundColor: color,
                        left: `${Math.cos(i * (Math.PI * 2) / 5) * 15}px`,
                        top: `${Math.sin(i * (Math.PI * 2) / 5) * 15}px`,
                        opacity: 0.7 * normalizedHealth
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 * normalizedHealth }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    />
                  ))}
                  
                  {/* Flower center */}
                  <motion.div 
                    className="rounded-full bg-yellow-400"
                    style={{ 
                      width: `${10 + fruits * 0.2}px`, 
                      height: `${10 + fruits * 0.2}px`,
                      opacity: normalizedHealth 
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        );
        
      case "bonds": // Tree style for bonds
      default:
        return (
          <div className="flex flex-col items-center">
            {/* Trunk */}
            <motion.div
              className="bg-brown-600"
              style={{ 
                height: `${height}rem`, 
                width: `${width}px`, 
                backgroundColor: "#8B4513",
                opacity: normalizedHealth 
              }}
              initial={{ height: "5rem" }}
              animate={{ height: `${height}rem` }}
              transition={{ duration: 1 }}
            />
            
            {/* Branches and leaves */}
            {normalizedHealth > 0.2 && (
              <motion.div 
                className="relative -mt-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <svg 
                  height={`${40 + fruits * 5}`} 
                  width={`${50 + branches * 5}`} 
                  viewBox={`0 0 ${50 + branches * 5} ${40 + fruits * 5}`}
                  style={{ 
                    position: "relative", 
                    left: `-${(50 + branches * 5) / 2}px` 
                  }}
                >
                  <ellipse 
                    cx={(50 + branches * 5) / 2} 
                    cy={(40 + fruits * 5) / 2} 
                    rx={(25 + branches * 2.5)} 
                    ry={(20 + fruits * 2.5)} 
                    fill={color} 
                    opacity={0.8 * normalizedHealth} 
                  />
                </svg>
                
                {/* Fruits */}
                <div className="relative">
                  {[...Array(fruits)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-yellow-300"
                      style={{ 
                        width: "8px", 
                        height: "8px",
                        left: `${-20 + Math.random() * 40}px`,
                        top: `${-20 + Math.random() * 30}px`,
                        opacity: normalizedHealth 
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: normalizedHealth }}
                      transition={{ delay: 1 + i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        );
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="h-36">
        {renderPlant()}
      </div>
      <div className="mt-2 text-center">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-gray-500">
          成長率: {growthPercentage > 0 ? `+${(growthPercentage).toFixed(0)}%` : `${(growthPercentage).toFixed(0)}%`}
        </p>
      </div>
    </div>
  );
};

export default PlantGrowthVisual;
