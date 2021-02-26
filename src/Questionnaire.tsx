import React, { useState } from "react";
import NumericalQuestion from "./QuestionTypes/NumericalQuestion";
import SingleChoiceListQuestion from "./QuestionTypes/SingleChoiceListQuestion";
import SliderQuestion from "./QuestionTypes/SliderQuestion";

export interface QuestionnaireProps {}

const Questionnaire: React.SFC<QuestionnaireProps> = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<
    { question: string; answer: string | number | string[] }[]
  >([]);

  // Handles each answer from a question and puts it into the questionnaireAnswers state
  // array and advances the questionnaire to the next question
  const handleAnswer = (
    question: string,
    answer: string | number | string[]
  ) => {
    setTimeout(() => {
      const newAnswer = { question, answer };
      setQuestionnaireAnswers((prev) => [...prev, newAnswer]);
      setCurrentStep(currentStep + 1);
    }, 200);
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
      <SingleChoiceListQuestion
        goBackOneStep={() => handleGoingBackOneStep()}
        currentStep={currentStep}
        renderOnStep={1}
        question={"How many people did you shop with today?"}
        handleChoice={handleAnswer}
        answersArray={[
          "Not that many",
          "I swear it was only me",
          "I don't care, we were 10 people and my mom",
        ]}
      />
      {/* <NumericalQuestion
        goBackOneStep={() => handleGoingBackOneStep()}
        currentStep={currentStep}
        renderOnStep={1}
        question={"How many people did you shop with today?"}
        handleChoice={handleAnswer}
      /> */}
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
      <SliderQuestion
        currentStep={currentStep}
        renderOnStep={3}
        question={"How many people were with you while shopping today?"}
        subText={"Swipe right or left to adjust the slider."}
        rangeMax={8}
        rangeMin={0}
        intervals={1}
        startValue={2}
        handleChoice={handleAnswer}
        goBackOneStep={handleGoingBackOneStep}
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
        handleChoice={handleAnswer}
        goBackOneStep={handleGoingBackOneStep}
      />
    </div>
  );
};

export default Questionnaire;
