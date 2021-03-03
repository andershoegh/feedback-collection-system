import React, { useState } from "react";
import SliderQuestion from "./QuestionTypes/SliderQuestion";
// import RankingQuestion from "./QuestionTypes/RankingQuestion";
import NumericalQuestion from "./QuestionTypes/NumericalQuestion";
import SingleChoiceListQuestion from "./QuestionTypes/SingleChoiceListQuestion";
import MultiChoiceListQuestion from "./QuestionTypes/MultiChoiceListQuestion";
import Progressbar from "./Progressbar";
import TextQuestion from "./QuestionTypes/TextQuestion";
import FinishedPage from "./QuestionTypes/FinishedPage";
import { maxQuestions } from "./QuestionSettings";

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
      if (currentStep < maxQuestions) {
        setCurrentStep(currentStep + 1);
      } else if (currentStep === maxQuestions) {
        setCurrentStep(0);
      } else {
        setCurrentStep(0);
      }
    }, 200);
  };

    // Handles full completion of the questionnaire and resetting for a new participant
    const logAndReset = () => {
        // Send questionnaireAnswers to db or whatever

        setQuestionnaireAnswers([]);
        setCurrentStep(1);
        window.location.reload();
    };

    const handleGoingBackOneStep = () => {
        // Remove latest entry in questionnaireanswers array
        questionnaireAnswers.pop();
        // Set currentstep to previous step
        setCurrentStep(currentStep - 1);
    };

  console.log(questionnaireAnswers);

  return (
    <div className="w-full">
      <Progressbar maxSteps={maxQuestions} currentStep={currentStep} />

      <div className="h-screen flex justify-center items-center">
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
        <MultiChoiceListQuestion
          goBackOneStep={() => handleGoingBackOneStep()}
          currentStep={currentStep}
          renderOnStep={3}
          question={"How many people did you shop with today?"}
          handleChoice={handleAnswer}
          answersArray={[
            "Not that many",
            "I swear it was only me",
            "I don't care, we were 10 people and my mom",
          ]}
        />
        <NumericalQuestion
          goBackOneStep={() => handleGoingBackOneStep()}
          currentStep={currentStep}
          renderOnStep={2}
          question={"How many people did you shop with today?"}
          handleChoice={handleAnswer}
        />
        {/* <NumericalQuestion
        goBackOneStep={() => handleGoingBackOneStep()}
        currentStep={currentStep}
        renderOnStep={2}
        question={"How many people did you shop with today?"}
        handleChoice={handleAnswer}
      /> */}
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
                <RankingQuestion
                    currentStep={currentStep}
                    renderOnStep={5}
                    question={'What is most important to you while shopping?'}
                    subText={
                        'Order the list from most important to least important. Left-click on an item and use the W and S keys to move.'
                    }
                    items={['Clothing', 'Dairy and meat', 'Sweets']}
                    handleChoice={handleAnswer}
                    goBackOneStep={handleGoingBackOneStep}
                />
                <SliderQuestion
                    currentStep={currentStep}
                    renderOnStep={4}
                    question={'How many people were with you while shopping today?'}
                    subText={'Swipe right or left to adjust the slider.'}
                    rangeMax={4}
                    rangeMin={0}
                    intervals={1}
                    startValue={2}
                    // maxLabel={'4+'}
                    handleChoice={handleAnswer}
                    goBackOneStep={handleGoingBackOneStep}
                />
                <SliderQuestion
                    currentStep={currentStep}
                    renderOnStep={7}
                    question={'How was your shopping trip today?'}
                    subText={'Swipe right or left to adjust the slider.'}
                    rangeMin={0}
                    rangeMax={100}
                    startValue={50}
                    minLabel={'😫'}
                    maxLabel={'😄'}
                    handleChoice={handleAnswer}
                    goBackOneStep={handleGoingBackOneStep}
                />
                <TextQuestion
                    currentStep={currentStep}
                    renderOnStep={6}
                    question={"What's the most crowded areas in the store when you visit?"}
                    subText={'Please answer this question on your phone. Your answer will not be visible on this screen.'}
                    handleChoice={handleAnswer}
                    goBackOneStep={handleGoingBackOneStep}
                />
                <FinishedPage
                    currentStep={currentStep}
                    renderOnStep={8}
                    text={'Thanks for participating! 😘'}
                    subText={'Now please get outta here'}
                    goBackOneStep={handleGoingBackOneStep}
                    logAndReset={logAndReset}
                />
            </div>
        </div>
    );
};

export default Questionnaire;
