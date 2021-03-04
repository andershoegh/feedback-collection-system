import React, { useState } from "react";
import SliderQuestion from "./QuestionTypes/SliderQuestion";
import RankingQuestion from "./QuestionTypes/RankingQuestion";
import NumericalQuestion from "./QuestionTypes/NumericalQuestion";
import SingleChoiceListQuestion from "./QuestionTypes/SingleChoiceListQuestion";
import MultiChoiceListQuestion from "./QuestionTypes/MultiChoiceListQuestion";
import Progressbar from "./Progressbar";
import TextQuestion from "./QuestionTypes/TextQuestion";
import FinishedPage from "./QuestionTypes/FinishedPage";
import { language, maxQuestions } from "./QuestionSettings";
import { useFirestore, fb } from "./Firebase/firebase";
import WelcomePage from "./WelcomePage";
import ButtonQuestion from "./QuestionTypes/ButtonQuestion";
import SwitchLanguageButton from "./SwitchLanguageButton";

export interface QuestionnaireProps {}

const Questionnaire: React.SFC<QuestionnaireProps> = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<
    { question: string; answer: string | number | string[] }[]
  >([]);

  const fs = useFirestore();

  // Handles each answer from a question and puts it into the questionnaireAnswers state
  // array and advances the questionnaire to the next question
  const handleAnswer = (
    question: string,
    answer: string | number | string[]
  ) => {
    setTimeout(() => {
      const newAnswer = { question, answer };
      const newQuestionnaireEntry = [...questionnaireAnswers, newAnswer];
      setQuestionnaireAnswers(newQuestionnaireEntry);
      if (currentStep < maxQuestions) {
        setCurrentStep(currentStep + 1);
      } else if (currentStep === maxQuestions) {
        // Save the answers to firestore
        fs.collection("questionnaire")
          .doc()
          .set({
            newQuestionnaireEntry,
            created: fb.FieldValue.serverTimestamp(),
          })
          .then(() => console.log("Succesfully added answers to DB"))
          .catch((err: string) =>
            console.log("There was an error saving to firestore: " + err)
          );

        logAndReset();
      } else {
        logAndReset();
      }
    }, 200);
  };

  // Handles full completion of the questionnaire and resetting for a new participant
  const logAndReset = () => {
    // Send questionnaireAnswers to db or whatever

    // setQuestionnaireAnswers([]);
    setCurrentStep(0);
    window.location.reload();
  };

  const handleGoingBackOneStep = () => {
    // Remove latest entry in questionnaireanswers array
    questionnaireAnswers.pop();
    // Set currentstep to previous step
    setCurrentStep(currentStep - 1);
  };

  const startOnPhoneConnection = () => {
    setCurrentStep(1);
  };

  console.log(questionnaireAnswers);

  return (
    <div className="w-full relative">
      <Progressbar maxSteps={maxQuestions} currentStep={currentStep} />

      <SwitchLanguageButton renderOnStep={currentStep} />

      <div className="h-screen flex justify-center items-center">
        {/* Demo data  */}

        <ButtonQuestion
          currentStep={currentStep}
          goBackOneStep={handleGoingBackOneStep}
          handleChoice={handleAnswer}
          renderOnStep={1}
          firstButtonText={language === "Danish" ? "Ja" : "Yes"}
          secondButtonText={language === "Danish" ? "Nej" : "No"}
          question={
            language === "Danish"
              ? "Var du bekymret for hvor tæt andre kom på dig under dit indkøb?"
              : "Did you worry about how close people got to you while shopping?"
          }
        />
        <ButtonQuestion
          currentStep={currentStep}
          goBackOneStep={handleGoingBackOneStep}
          handleChoice={handleAnswer}
          renderOnStep={2}
          firstButtonText={language === "Danish" ? "Ja" : "Yes"}
          secondButtonText={language === "Danish" ? "Nej" : "No"}
          question={
            language === "Danish"
              ? "Var du bekymret for hvor tæt andre kom på dig under dit indkøb?"
              : "Did you worry about how close people got to you while shopping?"
          }
        />

        {/* End of demo data */}

        <FinishedPage
          currentStep={currentStep}
          renderOnStep={8}
          text={"Thanks for participating! 😘"}
          subText={"Now please get outta here"}
          goBackOneStep={handleGoingBackOneStep}
          logAndReset={logAndReset}
        />
        <WelcomePage
          currentStep={currentStep}
          renderOnStep={0}
          startOnPhoneConnection={startOnPhoneConnection}
        />
      </div>
    </div>
  );
};

export default Questionnaire;
