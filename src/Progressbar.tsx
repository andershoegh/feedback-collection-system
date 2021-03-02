import React from "react";

export interface ProgressbarProps {
  maxSteps: number;
  currentStep: number;
}

const Progressbar: React.SFC<ProgressbarProps> = ({
  maxSteps,
  currentStep,
}) => {
  const progress = (currentStep / maxSteps) * 100 + "%";

  return (
    <div
      style={{ width: progress }}
      className={`h-1 bg-blue-500 transition-all duration-300`}
    ></div>
  );
};

export default Progressbar;
