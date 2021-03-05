import { ArrowRight } from "phosphor-react";
import React from "react";
import { Touchless } from "touchless-navigation";
import { language, maxQuestions } from "./QuestionSettings";

export interface NextButtonProps {
  onClick: () => void;
  currentStep: number;
}

const NextButton: React.SFC<NextButtonProps> = ({ onClick, currentStep }) => {
  return (
    <div className="absolute bottom-10 right-0">
      <Touchless
        onClick={onClick}
        className={`flex px-6 py-2 text-xl  place-items-center`}
      >
        {maxQuestions === currentStep
          ? language === "Danish"
            ? "Afslut"
            : "Finish"
          : language === "Danish"
          ? "Næste"
          : "Next"}

        <ArrowRight className="ml-2 text-2xl" />
      </Touchless>
    </div>
  );
};

export default NextButton;
