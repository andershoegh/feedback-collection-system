import React from "react";
import { Touchless } from "touchless-navigation";
import BackButton from "../BackButton";

export interface SingleChoiceListQuestionProps {
  currentStep: number;
  renderOnStep: number;
  question: string;
  answersArray: string[];
  handleChoice: (question: string, answer: string) => void;
  goBackOneStep: () => void;
}

const SingleChoiceListQuestion: React.SFC<SingleChoiceListQuestionProps> = ({
  currentStep,
  renderOnStep,
  question,
  answersArray,
  handleChoice,
  goBackOneStep,
}) => {
  //   console.log(answersArray);

  return (
    <>
      {currentStep !== renderOnStep ? null : (
        <div className="w-4/5 relative h-screen">
          <BackButton
            currentStep={currentStep}
            onClick={() =>
              setTimeout(() => {
                goBackOneStep();
              }, 200)
            }
          />
          <div className="absolute top-32">
            <div className="text-3xl leading-10 font-bold">{question}</div>
            <div className="mt-2 text-gray-600">Choose one.</div>
            <ul className="w-4/5 mt-10 text-lg font-normal">
              {answersArray.map((answer) => {
                return (
                  <Touchless>
                    <li
                      key={answer}
                      onClick={() =>
                        setTimeout(() => {
                          handleChoice(question, answer);
                        }, 200)
                      }
                      className={`${buttonStyle} pl-4 py-3 mb-5`}
                    >
                      {answer}
                    </li>
                  </Touchless>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleChoiceListQuestion;

const buttonStyle =
  "shadow-inactive focus:shadow-focused focus:border-blue-500 border-4 border-transparent focus:outline-none rounded-xl active:scale-90 animate transition transform";
