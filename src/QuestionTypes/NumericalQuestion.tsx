import { Backspace } from "phosphor-react";
import React, { useState } from "react";
import BackButton from "../BackButton";
import NextButton from "../NextButton";

export interface NumericalQuestionProps {}

const NumericalQuestion: React.SFC<{
  currentStep: number;
  renderOnStep: number;
  question: string;
  handleChoice: (question: string, answer: string) => void;
  goBackOneStep: () => void;
}> = ({ currentStep, renderOnStep, question, handleChoice, goBackOneStep }) => {
  const [amount, setAmount] = useState<string>("");

  return (
    <>
      {currentStep !== renderOnStep ? null : (
        <div className="w-4/5 h-screen relative">
          <BackButton
            currentStep={currentStep}
            onClick={() => goBackOneStep()}
          />
          <div className="absolute top-32">
            <div className="text-3xl leading-10 font-medium">{question}</div>
            <div className="flex justify-center mt-8 font-medium text-6xl text-blue-600">
              <span className="">{amount === "0" ? "" : amount} </span>
              <span className=" animate-pulse font-light">|</span>
            </div>
            <div className="grid-cols-3  grid w-64 gap-3 mt-6 justify-items-center mx-auto text-2xl font-medium">
              <div
                onClick={() => setAmount(amount + "1")}
                className={`${buttonStyle} px-6 py-3`}
              >
                1
              </div>
              <div
                onClick={() => setAmount(amount + "2")}
                className={`${buttonStyle} px-6 py-3`}
              >
                2
              </div>
              <div
                onClick={() => setAmount(amount + "3")}
                className={`${buttonStyle} px-6 py-3`}
              >
                3
              </div>
              <div
                onClick={() => setAmount(amount + "4")}
                className={`${buttonStyle} px-6 py-3`}
              >
                4
              </div>
              <div
                onClick={() => setAmount(amount + "5")}
                className={`${buttonStyle} px-6 py-3`}
              >
                5
              </div>
              <div
                onClick={() => setAmount(amount + "6")}
                className={`${buttonStyle} px-6 py-3`}
              >
                6
              </div>
              <div
                onClick={() => setAmount(amount + "7")}
                className={`${buttonStyle} px-6 py-3`}
              >
                7
              </div>
              <div
                onClick={() => setAmount(amount + "8")}
                className={`${buttonStyle} px-6 py-3`}
              >
                8
              </div>
              <div
                onClick={() => setAmount(amount + "9")}
                className={`${buttonStyle} px-6 py-3`}
              >
                9
              </div>
              <div
                onClick={() => setAmount(amount + "0")}
                className={`${buttonStyle} px-6 py-3`}
              >
                0
              </div>
              <div
                onClick={() =>
                  setAmount(amount.substring(0, amount.length - 1))
                }
                className={`${buttonStyle} px-6 py-3 col-span-2 flex items-center font-normal text-2xl`}
              >
                <Backspace className="mr-2" />
                Delete
              </div>
            </div>
          </div>
          <NextButton onClick={() => handleChoice(question, amount)} />
        </div>
      )}
    </>
  );
};

export default NumericalQuestion;

const buttonStyle =
  "shadow-inactive focus:shadow-focused focus:border-blue-500 border-4 border-transparent focus:outline-none rounded-xl active:scale-90 animate transition transform";
