import React from "react";
import BackButton from "../BackButton";

export interface ButtonQuestionProps {}

const ButtonQuestion: React.SFC<{
  currentStep: number;
  renderOnStep: number;
  question: string;
  firstButtonText: string;
  secondButtonText: string;
  goBackOneStep: () => void;
  handleChoice: (question: string, answer: string | number | string[]) => void;
}> = ({
  currentStep,
  renderOnStep,
  question,
  firstButtonText,
  secondButtonText,
  handleChoice,
  goBackOneStep,
}) => {
  return (
    <>
      {currentStep !== renderOnStep ? null : (
        <div className="w-4/5 h-screen relative">
          <div className="mb-10 mt-4">
            <BackButton
              currentStep={currentStep}
              onClick={() => goBackOneStep()}
            />
          </div>
          <div className="absolute top-32">
            <div className="text-3xl leading-10 font-medium">{question}</div>
            <div className="flex justify-center mt-40">
              <button
                onClick={() =>
                  setTimeout(() => {
                    handleChoice(question, firstButtonText);
                  }, 200)
                }
                className={`${buttonStyle}`}
              >
                {firstButtonText}
              </button>
              <button
                onClick={() => handleChoice(question, secondButtonText)}
                className={`${buttonStyle}`}
              >
                {secondButtonText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ButtonQuestion;

const buttonStyle =
  "animate transition transform active:scale-90 duration-100  border-4 border-transparent shadow-inactive focus:shadow-focused focus:outline-none focus:border-4 focus:border-blue-500 focus:border-opacity-100 py-6 px-32 text-3xl rounded-xl m-4";
