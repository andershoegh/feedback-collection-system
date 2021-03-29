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

export interface QuestionnaireProps {}

const Questionnaire: React.SFC<QuestionnaireProps> = () => {
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
        } else {
            // *ERROR NOT CONNECTED*
            console.log('Error: Not connected');
        }
    }, [connected]);

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
                            ? 'Sprittede du dine hænder da du gik ind?'
                            : 'Did you sanitize or wash your hands when you entered the building?'
                    }
                />

                <MultiChoiceListQuestion
                    currentStep={currentStep}
                    goBackOneStep={handleGoingBackOneStep}
                    handleChoice={handleAnswer}
                    renderOnStep={2}
                    question={
                        language === 'Danish'
                            ? 'Hvilke af følgende situationer har du prøvet under en indkøbstur?'
                            : 'Which of the following situations have you tried on a shopping trip?'
                    }
                    answersArray={
                        language === 'Danish'
                            ? [
                                  'En eller flere personer er kommet for tæt på mig',
                                  'Jeg er blevet gjort opmmærksom på at holde mere afstand til andre',
                                  'Jeg har set en eller flere personer glemme at spritte hænder ved indgangen',
                                  'Ingen af de ovenstående'
                              ]
                            : [
                                  'One or more people have gotten close to me',
                                  'I have been asked to keep distance',
                                  'I have seen one or more people forgetting to sanitize their hands',
                                  'None of the above'
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
                            ? 'Hvor mange gange har du besøgt storcenteret den sidste måned?'
                            : 'How many times have you visited the mall the last month?'
                    }
                />

                <RankingQuestion
                    currentStep={currentStep}
                    goBackOneStep={handleGoingBackOneStep}
                    handleChoice={handleAnswer}
                    renderOnStep={4}
                    question={
                        language === 'Danish'
                            ? 'Hvilke initiativer er vigtigst for at skabe tryghed for dig når du shopper?'
                            : 'Which initiatives er most important to create security for you when you are shopping?'
                    }
                    answersArray={
                        language === 'Danish'
                            ? [
                                  'Mange steder at spritte hænder',
                                  'Skiltning som hjælper med hvilken side af en gang man skal gå i',
                                  'Personale som hjælper folk med at overholde COVID-19 retningslinjer',
                              ]
                            : [
                                  'Many places to sanitize your hands',
                                  'Signs to help with which side of a hallway you should walk on',
                                  'Staff to help people to comply with COVID-19 guidelines',
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
                            ? 'Har du prøvet at bede andre om at holde bedre afstand?'
                            : 'Have you tried asking others to keep a better social distance?'
                    }
                    answersArray={
                        language === 'Danish'
                            ? [
                                  'Ja',
                                  'Nej',
                                  'Det har jeg ikke haft behov for',
                                  'Det har jeg ikke lyst til',
                              ]
                            : [
                                  'Yes',
                                  'No',
                                  'I have not had the need to do it',
                                  'I do not feel like doing that',
                              ]
                    }
                />

                <SliderQuestion
                    currentStep={currentStep}
                    goBackOneStep={handleGoingBackOneStep}
                    handleChoice={handleAnswer}
                    renderOnStep={6}
                    question={
                        language === 'Danish'
                            ? 'Hvor tilfreds har du været med andres overholdelse af COVID-19 retningslinjer under din shopping i dag?'
                            : 'How satisfied have you been with others people compliance with COVID-19 guidelines during you shopping today??'
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
