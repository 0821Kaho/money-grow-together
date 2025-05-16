
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LeafVisual from "@/components/ui/LeafVisual";
import MoneyVisual from "@/components/ui/MoneyVisual";

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
      case "savings": // Savings plant with coins
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
            
            {/* Leaves/Branches - now using leaf visuals */}
            {normalizedHealth > 0.3 && (
              <motion.div 
                className="flex flex-col items-center relative -mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {/* Add themed coins to the plant */}
                {[...Array(fruits)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ 
                      left: i % 2 === 0 ? `-${15 + i * 3}px` : `${15 + i * 3}px`,
                      top: `-${10 + i * 10}px`
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                  >
                    <MoneyVisual type="coin" size="small" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        );
        
      case "stocks": // Stocks plant with leaves
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
            
            {/* LeafVisual components for stocks */}
            {normalizedHealth > 0.2 && (
              <motion.div 
                className="relative -mt-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="relative">
                  {/* Use themed leaf visuals */}
                  {[...Array(Math.max(3, Math.floor(fruits * 0.5)))].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{ 
                        left: `${(Math.cos(i * (Math.PI * 2) / 3) * 20) - 15}px`,
                        top: `${(Math.sin(i * (Math.PI * 2) / 3) * 20) - 15}px`
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: normalizedHealth }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <LeafVisual type="single" size="small" animate={false} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        );
        
      case "bonds": // Bonds with both coins and leaves
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
            
            {/* Branches with both leaves and coins */}
            {normalizedHealth > 0.2 && (
              <motion.div 
                className="relative -mt-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                {/* Use LeafVisual for the canopy */}
                <motion.div
                  className="absolute"
                  style={{ 
                    left: `-20px`,
                    top: `-30px`
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: normalizedHealth }}
                  transition={{ delay: 0.6 }}
                >
                  <LeafVisual type="multiple" size="medium" animate={false} />
                </motion.div>
                
                {/* Use MoneyVisual for the fruits/coins */}
                {[...Array(fruits)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ 
                      left: `${-15 + Math.random() * 30}px`,
                      top: `${-10 + Math.random() * 20}px`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: normalizedHealth }}
                    transition={{ delay: 1 + i * 0.2 }}
                  >
                    <MoneyVisual type="coin" size="small" />
                  </motion.div>
                ))}
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
