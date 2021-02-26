import React from "react";

export interface ButtonQuestionProps {}

const ButtonQuestion: React.SFC<{
  currentStep: number;
  renderOnStep: number;
  question: string;
  firstButtonText: string;
  secondButtonText: string;
  handleChoice: (question: string, answer: string | number | string[]) => void;
}> = ({
  currentStep,
  renderOnStep,
  question,
  firstButtonText,
  secondButtonText,
  handleChoice,
}) => {
  return (
    <>
      {currentStep !== renderOnStep ? null : (
        <div>
          <div className="text-3xl mx-24 leading-10 font-medium">
            {question}
          </div>
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
              onClick={() =>
                setTimeout(() => {
                  handleChoice(question, secondButtonText);
                }, 200)
              }
              className={`${buttonStyle}`}
            >
              {secondButtonText}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ButtonQuestion;

const buttonStyle =
  "animate transition transform active:scale-90 duration-100  border-4 border-transparent shadow-inactive focus:shadow-focused focus:outline-none focus:border-4 focus:border-blue-500 focus:border-opacity-100 py-6 px-32 text-3xl rounded-xl m-4";
