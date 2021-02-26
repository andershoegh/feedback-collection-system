import React, { useState } from "react";
import ButtonQuestion from "./QuestionTypes/ButtonQuestion";
import NumericalQuestion from "./QuestionTypes/NumericalQuestion";
import RankedListQuestion from "./QuestionTypes/RankedListQuestion";
import SliderQuestion from "./QuestionTypes/SliderQuestion";

export interface QuestionnaireProps {}

const Questionnaire: React.SFC<QuestionnaireProps> = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [questionnaireAnswers, setQuestionnaireAnswers] = useState<{ question: string; answer: string | number | string[] }[]>(
        []
    );

    // Handles each answer from a question and puts it into the questionnaireAnswers state
    // array and advances the questionnaire to the next question
    const handleAnswer = (question: string, answer: string | number | string[]) => {
        const newAnswer = { question, answer };
        setQuestionnaireAnswers((prev) => [...prev, newAnswer]);
        setCurrentStep(currentStep + 1);
    };

  const handleGoingBackOneStep = () => {
    // Remove latest entry in questionnaireanswers array
    questionnaireAnswers.pop();
    // Set currentstep to previous step
    setCurrentStep(currentStep - 1);
  };

  console.log(questionnaireAnswers);

  return (
    <div className="h-screen w-2/3 flex justify-center items-center">
      <NumericalQuestion
        goBackOneStep={() => handleGoingBackOneStep()}
        currentStep={currentStep}
        renderOnStep={1}
        question={"How many people did you shop with today?"}
        handleChoice={handleAnswer}
      />
      <NumericalQuestion
        goBackOneStep={() => handleGoingBackOneStep()}
        currentStep={currentStep}
        renderOnStep={2}
        question={"How many people did you shop with today?"}
        handleChoice={handleAnswer}
      />
      {/* <ButtonQuestion
        currentStep={currentStep}
        renderOnStep={1}
        question={
          "Are you satisfied with peoples ability to stay socially distanced throughout the store?"
        }
        firstButtonText={"Yes"}
        secondButtonText={"No"}
        handleChoice={handleAnswer}
      /> */}
      {/* <ButtonQuestion
        currentStep={currentStep}
        renderOnStep={2}
        question={"Hello?"}
        firstButtonText={"Yes"}
        secondButtonText={"No"}
        handleChoice={handleAnswer}
      /> */}
      <RankedListQuestion currentStep={currentStep} renderOnStep={3} />
      <SliderQuestion
        currentStep={currentStep}
        renderOnStep={3}
        question={"How many people were with you while shopping today?"}
        subText={"Swipe right or left to adjust the slider."}
        rangeMax={8}
        rangeMin={0}
        intervals={1}
        startValue={2}
        // maxLabel={'4+'}
      />
      <SliderQuestion
        currentStep={currentStep}
        renderOnStep={4}
        question={"How was your shopping trip today?"}
        subText={"Swipe right or left to adjust the slider."}
        rangeMin={0}
        rangeMax={100}
        startValue={50}
        minLabel={"😫"}
        maxLabel={"😄"}
      />
    </div>
  );
};

export default Questionnaire;
