import { ArrowRight } from "phosphor-react";
import React from "react";
import { Touchless } from "touchless-navigation";
import { maxQuestions } from "./QuestionSettings";

export interface NextButtonProps {
  onClick: () => void;
  currentStep: number;
}

const NextButton: React.SFC<NextButtonProps> = ({ onClick, currentStep }) => {
  return (
    <div className="absolute bottom-10 right-0">
      <Touchless>
        <button
          onClick={onClick}
          className={`${buttonStyle} flex px-6 py-2 text-xl  place-items-center`}
        >
          {maxQuestions === currentStep ? "Finish" : "Next"}
          <ArrowRight className="ml-2 text-2xl" />
        </button>
      </Touchless>
    </div>
  );
};

export default NextButton;

const buttonStyle =
  "shadow-inactive focus:shadow-focused focus:border-blue-500 border-4 border-transparent focus:outline-none rounded-xl active:scale-90 animate transition transform";
