import React, { useState } from "react";
import ButtonQuestion from "./QuestionTypes/ButtonQuestion";
import RankedListQuestion from "./QuestionTypes/RankedListQuestion";

export interface QuestionnaireProps {}

const Questionnaire: React.SFC<QuestionnaireProps> = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <div className="h-screen w-2/3 flex justify-center items-center">
      <button onClick={() => setCurrentStep(currentStep + 1)}>
        Click to advance
      </button>
      <ButtonQuestion
        currentStep={currentStep}
        renderOnStep={1}
        question={
          "Are you satisfied with peoples ability to stay socially distanced throughout the store?"
        }
        firstButtonText={"Yes"}
        secondButtonText={"No"}
      />
      <RankedListQuestion currentStep={currentStep} renderOnStep={2} />
    </div>
  );
};

export default Questionnaire;
