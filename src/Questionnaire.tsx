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
import { useFirestore, fb } from './firebase';
import {
    useConnectionChange,
    useGoToStartElement,
    useNewSession,
} from 'touchless-navigation';
import { InteractionType } from './App';

export interface QuestionnaireProps {
    showQR: boolean;
    nextInteractionType: () => void;
    interactionType: InteractionType;
}

const Questionnaire: React.SFC<QuestionnaireProps> = ({
    showQR,
    interactionType,
    nextInteractionType,
}) => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [questionnaireAnswers, setQuestionnaireAnswers] = useState<
        { question: string; answer: string | number | string[] }[]
    >([]);
    const { language } = useContext(LanguageContext);
    const [inProgress, setInProgress] = useState(false);
    const [disconnectResetTimer, setDisconnectResetTimer] = useState(25);
    const disconnectModalBg = useRef<HTMLDivElement>(null);
    const disconnectModal = useRef<HTMLDivElement>(null);
    let disconnectInterval = useRef<ReturnType<typeof setInterval>>();
    const fs = useFirestore();
    const connected = useConnectionChange();
    const goToStart = useRef(useGoToStartElement());
    const newSession = useNewSession();
    const interactionCTAText = {
        da:
            interactionType.substr(0, 5) === 'phone'
                ? 'klik på linket'
                : 'scan QR koden',
        en:
            interactionType.substr(0, 5) === 'phone'
                ? 'click the link'
                : 'scan the QR code',
    };

    const animateModal = (show: boolean) => {
        if (show) {
            if (disconnectModal.current && disconnectModalBg.current) {
                disconnectModalBg.current.animate(
                    {
                        opacity: ['0', '1'],
                    },
                    {
                        duration: 200,
                        easing: 'ease-out',
                        fill: 'forwards',
                    }
                );
                disconnectModal.current.animate(
                    {
                        transform: [
                            'translate(-50%, 110%)',
                            'translate(-50%, 0)',
                        ],
                    },
                    {
                        duration: 600,
                        easing: 'ease-in-out',
                        fill: 'forwards',
                    }
                );
            }
        } else {
            if (disconnectModal.current && disconnectModalBg.current) {
                disconnectModalBg.current.animate(
                    {
                        opacity: ['1', '1', '0'],
                        offset: [0, 0.6, 1],
                    },
                    {
                        duration: 600,
                        fill: 'forwards',
                    }
                );
                disconnectModal.current.animate(
                    {
                        transform: [
                            'translate(-50%, 0)',
                            'translate(-50%, 110%)',
                        ],
                    },
                    {
                        duration: 600,
                        easing: 'ease-in-out',
                        fill: 'forwards',
                    }
                );
            }
        }
    };

    // Handles connection and phone disconnection
    useEffect(() => {
        if (connected && !inProgress) {
            // Starts the questionnaire on connection
            setCurrentStep(1);
        } else if (!connected && inProgress) {
            // Handles dropped connection to phone while in progress

            // Show modal
            animateModal(true);

            // Start setInterval countdown to reset
            let time = disconnectResetTimer;
            disconnectInterval.current = setInterval(() => {
                if (time < 1) {
                    clearInterval(disconnectInterval.current!);
                    animateModal(false);

                    // Reset system
                    setQuestionnaireAnswers([]);
                    setInProgress(false);
                    newSession();
                    setTimeout(() => {
                        setCurrentStep(0);
                    }, 1000);
                }
                setDisconnectResetTimer(time);
                time--;
            }, 1000);
        } else if (connected && inProgress) {
            // Handles phone reconnect while in progress

            // Remove modal
            animateModal(false);

            // Cancel setInterval
            clearInterval(disconnectInterval.current!);
            setDisconnectResetTimer(25);
        } else {
            // *ERROR NOT CONNECTED*
            console.error('Error: Not connected');
        }
        // eslint-disable-next-line
    }, [connected]);

    useEffect(() => {
        goToStart.current();
        if (currentStep === maxQuestions || currentStep === 0) {
            setInProgress(false);
        } else {
            setInProgress(true);
        }
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
        const answers = [...questionnaireAnswers];
        fs.collection('questionnaire')
            .doc()
            .set({
                answers,
                created: fb.FieldValue.serverTimestamp(),
            })
            .then(() => {
                console.log('Successfully added answers to DB');
            })
            .catch((err: string) =>
                console.log('There was an error saving to firestore: ' + err)
            )
            .then(() => {
                // Resets the questionnaire for the next user and changes to the next interaction type
                setQuestionnaireAnswers([]);
                newSession();
                nextInteractionType();
                setInProgress(false);
                setTimeout(() => {
                    setCurrentStep(0);
                }, 1000);
            });
    };

    const handleGoingBackOneStep = () => {
        // Remove latest entry in questionnaireanswers array
        questionnaireAnswers.pop();
        // Set currentstep to previous step
        setCurrentStep(currentStep - 1);
    };

    const startQuestionnaire = () => {
        setCurrentStep(1);
    };

    return (
        <>
            <div
                ref={disconnectModalBg}
                className="absolute w-full h-full bg-black bg-opacity-40 z-10 overflow-hidden"
                style={{ opacity: '0' }}
            >
                <div
                    ref={disconnectModal}
                    className="w-1/2 absolute bottom-10 left-1/2 transform -translate-x-1/2 shadow-inactive py-14 text-4xl text-center rounded-xl bg-white"
                >
                    <h3 className="text-red-600 font-bold">
                        Forbindelsen til telefonen røg
                    </h3>
                    <p className="text-2xl pt-7 pb-16">
                        Tjek internetforbindelsen på din telefon for at forbinde
                        igen
                    </p>
                    <p className="text-base">
                        Systemet nulstiller automatisk om {disconnectResetTimer}{' '}
                        {disconnectResetTimer > 1 ? 'sekunder' : 'sekund'}
                    </p>
                </div>
            </div>
            <div className="w-full relative">
                <Progressbar
                    maxSteps={maxQuestions}
                    currentStep={currentStep}
                />

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
                                      'Ingen af de ovenstående',
                                  ]
                                : [
                                      'One or more people have gotten close to me',
                                      'I have been asked to keep distance',
                                      'I have seen one or more people forgetting to sanitize their hands',
                                      'None of the above',
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
                                ? 'Hvor mange andre personer handler du med i dag?'
                                : 'How many other people are you shopping with today?'
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
                        interactionType={interactionType}
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
                                ? `Hjælp os ved at svare på nogle få spørgsmål om din oplevelse med at styre denne kontaktløse skærm - ${interactionCTAText.da} herunder`
                                : `Help us by answering a few questions about your experience controlling this touchless display - ${interactionCTAText.en} below`
                        }
                        goBackOneStep={handleGoingBackOneStep}
                        interactionType={interactionType}
                        logAndReset={logAndReset}
                    />
                    <WelcomePage
                        currentStep={currentStep}
                        renderOnStep={0}
                        startQuestionnaire={startQuestionnaire}
                        showQR={showQR}
                    />
                </div>
            </div>
        </>
    );
};

export default Questionnaire;
