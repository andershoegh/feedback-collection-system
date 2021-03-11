import React, { useContext } from 'react'
import { Touchless } from 'touchless-navigation'
import BackButton from '../BackButton'
import { LanguageContext } from '../QuestionSettings'

export interface SingleChoiceListQuestionProps {
    currentStep: number
    renderOnStep: number
    question: string
    answersArray: string[]
    handleChoice: (question: string, answer: string) => void
    goBackOneStep: () => void
}

const SingleChoiceListQuestion: React.SFC<SingleChoiceListQuestionProps> = ({
    currentStep,
    renderOnStep,
    question,
    answersArray,
    handleChoice,
    goBackOneStep,
}) => {
    //   console.log(answersArray);
    const { language } = useContext(LanguageContext)

    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="w-4/5 relative h-screen">
                    <BackButton
                        currentStep={currentStep}
                        onClick={() =>
                            setTimeout(() => {
                                goBackOneStep()
                            }, 200)
                        }
                    />
                    <div className="absolute top-32">
                        <div className="text-3xl leading-10 font-bold">
                            {question}
                        </div>
                        <div className="mt-2 text-gray-600">
                            {language === 'Danish' ? 'Vælg én' : 'Choose one'}
                        </div>
                        <ul className="w-4/5 mt-10 text-lg font-normal">
                            {answersArray.map((answer, i) => {
                                return (
                                    <Touchless
                                        className={`shadow-inactive rounded-xl pl-4 py-3 mb-5 border-4 border-transparent`}
                                        key={answer}
                                        startElement={i === 0}
                                        onClick={() =>
                                            setTimeout(() => {
                                                handleChoice(question, answer)
                                            }, 200)
                                        }
                                    >
                                        {answer}
                                    </Touchless>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}

export default SingleChoiceListQuestion
