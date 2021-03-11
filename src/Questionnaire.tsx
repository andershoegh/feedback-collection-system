import React, { useContext, useEffect, useRef, useState } from 'react'
import SliderQuestion from './QuestionTypes/SliderQuestion'
import RankingQuestion from './QuestionTypes/RankingQuestion'
import NumericalQuestion from './QuestionTypes/NumericalQuestion'
import SingleChoiceListQuestion from './QuestionTypes/SingleChoiceListQuestion'
import MultiChoiceListQuestion from './QuestionTypes/MultiChoiceListQuestion'
import Progressbar from './Progressbar'
// import TextQuestion from "./QuestionTypes/TextQuestion";
import FinishedPage from './QuestionTypes/FinishedPage'
import { LanguageContext, maxQuestions } from './QuestionSettings'
import { useFirestore, fb } from './Firebase/firebase'
import WelcomePage from './WelcomePage'
import ButtonQuestion from './QuestionTypes/ButtonQuestion'
import SwitchLanguageButton from './SwitchLanguageButton'
import { useConnectionChange, useGoToStartElement } from 'touchless-navigation'

export interface QuestionnaireProps {}

const Questionnaire: React.SFC<QuestionnaireProps> = () => {
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [questionnaireAnswers, setQuestionnaireAnswers] = useState<
        { question: string; answer: string | number | string[] }[]
    >([])

    const { language } = useContext(LanguageContext)
    const connected = useConnectionChange()
    const goToStart = useRef(useGoToStartElement())

    useEffect(() => {
        if (connected === true) {
            setCurrentStep(1)
        } else {
            // console.log("Not connected"):
        }
    }, [connected])

    const fs = useFirestore()

    useEffect(() => {
        goToStart.current()
    }, [currentStep])

    // Handles each answer from a question and puts it into the questionnaireAnswers state
    // array and advances the questionnaire to the next question
    const handleAnswer = (
        question: string,
        answer: string | number | string[]
    ) => {
        const newAnswer = { question, answer }
        const newQuestionnaireEntry = [...questionnaireAnswers, newAnswer]
        setQuestionnaireAnswers(newQuestionnaireEntry)
        if (currentStep < maxQuestions) {
            setCurrentStep(currentStep + 1)
        }
    }

    // Handles full completion of the questionnaire and resetting for a new participant
    const logAndReset = () => {
        // Sends questionnaireAnswers to db and then resets
        fs.collection('questionnaire')
            .doc()
            .set({
                questionnaireAnswers,
                created: fb.FieldValue.serverTimestamp(),
            })
            .then(() => console.log('Succesfully added answers to DB'))
            .catch((err: string) =>
                console.log('There was an error saving to firestore: ' + err)
            )
            .then(() => {
                setCurrentStep(0)
                window.location.reload()
            })
            .catch((err) => console.log(err))
    }

    const handleGoingBackOneStep = () => {
        // Remove latest entry in questionnaireanswers array
        questionnaireAnswers.pop()
        // Set currentstep to previous step
        setCurrentStep(currentStep - 1)
    }

    const startOnPhoneConnection = () => {
        setCurrentStep(1)
    }

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
                            ? 'Var du bekymret for hvor tæt andre kom på dig under dit indkøb?'
                            : 'Did you worry about how close people got to you while shopping?'
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
                                  'Jeg synes der var god plads i butikken',
                                  'Jeg synes folk holdt god afstand',
                                  'Det var nemt at vide hvor mange der var i butikken inden jeg gik ind',
                              ]
                            : [
                                  'I thought there was plenty of space in the store',
                                  'I think people kept a good social distance',
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
                            ? 'Hvor mange gange handler du om ugen i gennemsnit?'
                            : 'How often do you on average shop groceries per week?'
                    }
                />

                <RankingQuestion
                    currentStep={currentStep}
                    goBackOneStep={handleGoingBackOneStep}
                    handleChoice={handleAnswer}
                    renderOnStep={4}
                    question={
                        language === 'Danish'
                            ? 'I hvilke områder var der flest mennesker?'
                            : 'In which areas were there most people?'
                    }
                    answersArray={
                        language === 'Danish'
                            ? [
                                  'Vin og spiritus',
                                  'Mejeri og kød',
                                  'Frugt og grønt',
                              ]
                            : [
                                  'Wine and spirits',
                                  'Dairy and meat',
                                  'Fruit and vegetable',
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
                            ? 'Har du oplevet at folk kommer for tæt på imens du handler?'
                            : 'Have you experienced people coming too close to you while shopping?'
                    }
                    answersArray={
                        language === 'Danish'
                            ? ['Ja', 'Nej', 'Det er jeg ligeglad med']
                            : ['Yes', 'No', "I don't care about that"]
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
                            ? 'Hvis du vil give os din feedback kan du gå til ....'
                            : 'If you want to provide us with your feedback - please go to .....'
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
    )
}

export default Questionnaire
