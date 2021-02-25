import React, { useState } from "react";
import ButtonQuestion from "./QuestionTypes/ButtonQuestion";
import RankedListQuestion from "./QuestionTypes/RankedListQuestion";

export interface QuestionnaireProps {}

const Questionnaire: React.SFC<QuestionnaireProps> = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<
    { questionNumber: number; answer: string | number | string[] }[]
  >([]);

  // Handles each answer from a question and puts it into the questionnaireAnswers state
  // array and advances the questionnaire to the next question
  const handleAnswer = (
    questionNumber: number,
    answer: string | number | string[]
  ) => {
    const newAnswer = { questionNumber, answer };
    setQuestionnaireAnswers((prev) => [...prev, newAnswer]);
    setCurrentStep(currentStep + 1);
  };

  console.log(questionnaireAnswers);

  return (
    <div className="h-screen w-2/3 flex justify-center items-center">
      <ButtonQuestion
        currentStep={currentStep}
        renderOnStep={1}
        question={
          "Are you satisfied with peoples ability to stay socially distanced throughout the store?"
        }
        firstButtonText={"Yes"}
        secondButtonText={"No"}
        handleChoice={handleAnswer}
      />
      <ButtonQuestion
        currentStep={currentStep}
        renderOnStep={2}
        question={
          "Are you satisfied with peoples ability to stay socially distanced throughout the store?"
        }
        firstButtonText={"Yes"}
        secondButtonText={"No"}
        handleChoice={handleAnswer}
      />
      <RankedListQuestion currentStep={currentStep} renderOnStep={3} />
    </div>
  );
};

export default Questionnaire;
