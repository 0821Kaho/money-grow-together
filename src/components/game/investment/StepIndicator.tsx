
import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

const StepIndicator = ({ currentStep, totalSteps, stepTitle }: StepIndicatorProps) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs font-medium text-muted-foreground">
          STEP {currentStep}/{totalSteps}
        </div>
        <div className="text-sm font-medium">{stepTitle}</div>
      </div>
      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default StepIndicator;
