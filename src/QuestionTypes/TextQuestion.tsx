import React, { useEffect, useRef, useState } from "react";
import BackButton from "../BackButton";
import NextButton from "../NextButton";
import "./TextQuestion.css";

export interface TextQuestionProps {
  currentStep: number;
  renderOnStep: number;
  question: string;
  subText: string;
  handleChoice: (question: string, answer: string | number | string[]) => void;
  goBackOneStep: () => void;
}

const TextQuestion: React.FC<TextQuestionProps> = (props) => {
  const {
    currentStep,
    renderOnStep,
    question,
    subText,
    handleChoice,
    goBackOneStep,
  } = props;
  const [answer, setAnswer] = useState<string>("");
  const [getAnswerText, setGetAnswerText] = useState(
    "Waiting for an answer from your phone"
  );
  const [redoAnswer, setRedoAnswer] = useState(false);
  const dotsRef = useRef<HTMLDivElement>(null);

  const answerReceived = () => {
    if (dotsRef.current) {
      dotsRef.current.childNodes.forEach((child, index) => {
        const c = child as HTMLDivElement;

        // Setting check animations
        if (c.classList.contains("dot")) {
          const dotAnimationDuration = [".5s", "1.4s", ".5s"];
          const delay = index === 2 ? ".3s" : "0s";
          c.style.animation = `completeDot${index} ${dotAnimationDuration[index]} ${delay} forwards`;
        } else {
          c.style.display = "inline";
        }
      });
    }

    // Setting the correct display message and showing the redo-button
    setGetAnswerText("Answer received!");
    setRedoAnswer(true);
  };

  const playAnimation = () => {
    if (dotsRef.current) {
      dotsRef.current.childNodes.forEach((child, index) => {
        const c = child as HTMLDivElement;

        // Setting waiting animation on each dot and hiding the checkmark
        if (c.classList.contains("dot")) {
          c.style.animation = `dotTyping 2s infinite ${index * 0.1}s`;
        } else {
          c.style.display = "none";
        }
      });
    }

    // Setting the correct display message and hiding the redo-button
    setGetAnswerText("Waiting for an answer from your phone");
    setRedoAnswer(false);

    // Auto-runs the answerReceived after 5s - for testing
    setTimeout(() => {
      answerReceived();
    }, 5000);
  };

  // useEffect for running the animation on page load
  useEffect(() => {
    playAnimation();
  }, []);

  return (
    <>
      {currentStep !== renderOnStep ? null : (
        <div className="w-4/5 h-screen relative">
          <BackButton
            currentStep={currentStep}
            onClick={() =>
              setTimeout(() => {
                goBackOneStep();
              }, 200)
            }
          />

          <div className="absolute top-32">
            <div className="text-3xl leading-10 font-medium">{question}</div>
            <div className="font-normal text-gray-600 mt-2">{subText}</div>
            <div className="flex flex-col items-center mt-40">
              <div
                ref={dotsRef}
                className="mb-20 flex relative justify-between w-36"
              >
                <div className="dot dot-one"></div>
                <div className="dot dot-two"></div>
                <div className="dot dot-three"></div>
                <div className="checkmark draw absolute hidden"></div>
              </div>
              <div className="text-lg">{getAnswerText}</div>
              {!redoAnswer ? null : (
                <button
                  onClick={() => playAnimation()}
                  className={`mt-14 px-4 py-1 text-lg place-items-center ${buttonStyle}`}
                >
                  Want a do-over?
                </button>
              )}
            </div>
          </div>
          <NextButton
            onClick={() =>
              answer
                ? setTimeout(() => {
                    handleChoice(question, answer);
                  }, 200)
                : null
            }
          />
        </div>
      )}
    </>
  );
};

export default TextQuestion;

const buttonStyle =
  "shadow-inactive focus:shadow-focused focus:border-blue-500 border-4 border-transparent focus:outline-none rounded-xl active:scale-90 animate transition transform";
