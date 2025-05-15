
import React from "react";
import { cn } from "@/lib/utils";

interface EmotionColorThermometerProps {
  value: number; // Percentage value (-100 to 100)
  showLabel?: boolean;
  className?: string;
  height?: string;
}

/**
 * EmotionColorThermometer - A visual thermometer showing profit/loss with color gradients
 * 
 * @param value - Percentage value from -100 (max loss) to 100 (max gain)
 * @param showLabel - Whether to show the percentage label
 * @param className - Additional classes for the container
 * @param height - Height of the thermometer (default: "h-24")
 */
const EmotionColorThermometer = ({ 
  value, 
  showLabel = true, 
  className = "",
  height = "h-24"
}: EmotionColorThermometerProps) => {
  // Ensure value is between -100 and 100
  const normalizedValue = Math.max(-100, Math.min(100, value));
  
  // Calculate fill height as percentage (0-100%)
  const fillPercentage = 50 + (normalizedValue / 2);
  
  // Determine color based on value
  const getColor = () => {
    if (normalizedValue > 50) return "#8B5CF6"; // Vivid purple for large gains
    if (normalizedValue > 0) return "#33C3F0";  // Sky blue for gains
    if (normalizedValue > -50) return "#FEC6A1"; // Soft orange for small losses
    return "#F97316"; // Bright orange for large losses
  };
  
  // Label text and styling
  const labelText = `${normalizedValue > 0 ? '+' : ''}${normalizedValue.toFixed(1)}%`;
  const labelColor = normalizedValue >= 0 ? "text-green-600" : "text-red-600";

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn("relative w-6 rounded-full overflow-hidden bg-gray-200", height)}>
        <div 
          className="absolute bottom-0 w-full transition-all duration-500 ease-out rounded-full"
          style={{ 
            height: `${fillPercentage}%`,
            backgroundColor: getColor(),
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1/2 border-t border-gray-300"></div>
        </div>
      </div>
      
      {showLabel && (
        <div className={cn("mt-2 text-sm font-medium", labelColor)}>
          {labelText}
        </div>
      )}
    </div>
  );
};

export default EmotionColorThermometer;
