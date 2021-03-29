import React, { useContext, useEffect, useRef, useState } from 'react';
import SliderQuestion from './QuestionTypes/SliderQuestion';
import RankingQuestion from './QuestionTypes/RankingQuestion';
import NumericalQuestion from './QuestionTypes/NumericalQuestion';
import SingleChoiceListQuestion from './QuestionTypes/SingleChoiceListQuestion';
import MultiChoiceListQuestion from './QuestionTypes/MultiChoiceListQuestion';
import Progressbar from './Progressbar';
import FinishedPage from './QuestionTypes/FinishedPage';
import { LanguageContext, maxQuestions } from './QuestionSettings';
import WelcomePage from './WelcomePage';
import ButtonQuestion from './QuestionTypes/ButtonQuestion';
import SwitchLanguageButton from './SwitchLanguageButton';
import { useConnectionChange, useGoToStartElement } from 'touchless-navigation';

export interface QuestionnaireProps {
    setInteractionSelected: CallableFunction;
}

const Questionnaire: React.SFC<QuestionnaireProps> = (props) => {
    const { setInteractionSelected } = props;
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [questionnaireAnswers, setQuestionnaireAnswers] = useState<
        { question: string; answer: string | number | string[] }[]
    >([]);

    const { language } = useContext(LanguageContext);
    const connected = useConnectionChange();
    const goToStart = useRef(useGoToStartElement());

    useEffect(() => {
        if (connected === true) {
            setCurrentStep(1);
            setInteractionSelected('mobile');
        } else {
            // *ERROR NOT CONNECTED*
        }
    }, [connected, setInteractionSelected]);

    useEffect(() => {
        goToStart.current();
    }, [currentStep]);

    // Handles each answer from a question and puts it into the questionnaireAnswers state
    // array and advances the questionnaire to the next question
    const handleAnswer = (
        question: string,
        answer: string | number | string[]
    ) => {
        const newAnswer = { question, answer };
        const newQuestionnaireEntry = [...questionnaireAnswers, newAnswer];
        setQuestionnaireAnswers(newQuestionnaireEntry);
        if (currentStep < maxQuestions) {
            setCurrentStep(currentStep + 1);
        }
    };

    // Handles full completion of the questionnaire and resetting for a new participant
    const logAndReset = () => {
        // Sends questionnaireAnswers to db and then resets

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

    return (
        <div className="w-full relative">
            <Progressbar maxSteps={maxQuestions} currentStep={currentStep} />

            <SwitchLanguageButton
                renderOnStep={
                    currentStep
                } /* needs a way of setting const in QuestionSettings to english */
            />

            <div className="h-screen flex justify-center items-center">
                {/* Demo data  */}

                <ButtonQuestion
                    currentStep={currentStep}
                    goBackOneStep={handleGoingBackOneStep}
                    handleChoice={handleAnswer}
                    renderOnStep={1}
                    firstButtonText={language === 'Danish' ? 'Ja' : 'Yes'}
                    secondButtonText={language === 'Danish' ? 'Nej' : 'No'}
                    question={
                        language === 'Danish'
                            ? 'Bekymrer du dig over hvor tæt folk kommer på dig når du handler?'
                            : 'Do you worry about how close people get to you while you are shopping?'
                    }
                />

                <MultiChoiceListQuestion
                    currentStep={currentStep}
                    goBackOneStep={handleGoingBackOneStep}
                    handleChoice={handleAnswer}
                    renderOnStep={2}
                    question={
                        language === 'Danish'
                            ? 'Hvilke af følgende udsagn er du enig i?'
                            : 'Which of the following statements do you agree with?'
                    }
                    answersArray={
                        language === 'Danish'
                            ? [
                                  'Jeg synes der er god plads i storcenteret',
                                  'Jeg synes folk holder god afstand',
                                  'Det er nemt at vide om der er for mange i én butik inden jeg går ind',
                              ]
                            : [
                                  'I think there is sufficient space in the mall',
                                  'I think people are good at social distancing',
                                  'It was easy to find out how many were already in the store before i entered',
                              ]
                    }
                />

                <NumericalQuestion
                    currentStep={currentStep}
                    goBackOneStep={handleGoingBackOneStep}
                    handleChoice={handleAnswer}
                    renderOnStep={3}
                    question={
                        language === 'Danish'
                            ? 'Hvor ofte besøger du storcenteret hver måned?'
                            : 'How often do you visit the mall each month?'
                    }
                />

                <RankingQuestion
                    currentStep={currentStep}
                    goBackOneStep={handleGoingBackOneStep}
                    handleChoice={handleAnswer}
                    renderOnStep={4}
                    question={
                        language === 'Danish'
                            ? 'Hvad er vigtigst for dig?'
                            : 'What is the most important to you?'
                    }
                    answersArray={
                        language === 'Danish'
                            ? [
                                  'Gode parkeringsmuligheder',
                                  'Stort udvalg af specialbutikker',
                                  'Specielle arrangementer i centeret',
                              ]
                            : [
                                  'Good parking options',
                                  'A large selection of stores',
                                  'Special events in the mall',
                              ]
                    }
                />

                <SingleChoiceListQuestion
                    currentStep={currentStep}
                    goBackOneStep={handleGoingBackOneStep}
                    handleChoice={handleAnswer}
                    renderOnStep={5}
                    question={
                        language === 'Danish'
                            ? 'Har du oplevet at folk kommer for tæt på imens du er i centeret?'
                            : 'Have you experienced people coming too close to you while in the mall?'
                    }
                    answersArray={
                        language === 'Danish'
                            ? ['Ja', 'Nej', 'Det er ligegyldigt for mig']
                            : ['Yes', 'No', 'I do not care about that']
                    }
                />

                <SliderQuestion
                    currentStep={currentStep}
                    goBackOneStep={handleGoingBackOneStep}
                    handleChoice={handleAnswer}
                    renderOnStep={6}
                    question={
                        language === 'Danish'
                            ? 'Hvor tilfreds var du med din shoppingtur i dag?'
                            : 'How happy were you with your shopping trip today?'
                    }
                    minLabel={'🙁'}
                    maxLabel={'😄'}
                    rangeMax={100}
                    rangeMin={0}
                    startValue={50}
                />

                {/* <TextQuestion
                    currentStep={currentStep}
                    goBackOneStep={handleGoingBackOneStep}
                    handleChoice={handleAnswer}
                    renderOnStep={7}
                    question={
                        language === 'Danish'
                            ? 'Var der noget der frustrerede dig, mens du handlede? Hvis ja, beskriv det venligst'
                            : 'Did you have any frustrations during your grocery shopping? If you did, please describe them'
                    }
                /> */}

                {/* End of demo data */}

                <FinishedPage
                    currentStep={currentStep}
                    renderOnStep={7}
                    text={
                        language === 'Danish'
                            ? 'Tak for deltagelsen!'
                            : 'Thank you for participating'
                    }
                    subText={
                        language === 'Danish'
                            ? 'Hjælp os ved at svare på nogle få spørgsmål - klik på linket herunder:'
                            : 'Help us by answering a few questions - click the link below:'
                    }
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
