import React from "react";

export interface ButtonQuestionProps {}

const ButtonQuestion: React.SFC<{
  currentStep: number;
  renderOnStep: number;
  question: string;
  firstButtonText: string;
  secondButtonText: string;
}> = ({
  currentStep,
  renderOnStep,
  question,
  firstButtonText,
  secondButtonText,
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
              className={` border-4 border-transparent shadow-inactive focus:shadow-focused focus:outline-none focus:border-4 focus:border-blue-500 focus:border-opacity-100 py-6 px-32 text-3xl rounded-xl m-4`}
            >
              {firstButtonText}
            </button>
            <button
              className={` border-4 border-transparent shadow-inactive focus:shadow-focused focus:outline-none focus:border-4 focus:border-blue-500 focus:border-opacity-100 py-6 px-32 text-3xl rounded-xl m-4`}
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
