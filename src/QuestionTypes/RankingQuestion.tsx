import React, { useState, useRef, useContext, useEffect } from 'react'
import './RankingQuestion.css'
import Arrows from '../Resources/ArrowsDownUp.png'
import BackButton from '../BackButton'
import NextButton from '../NextButton'
import { Touchless, useCustomKeys } from 'touchless-navigation'
import { LanguageContext } from '../QuestionSettings'

export interface RankingQuestionProps {
    currentStep: number
    renderOnStep: number
    question: string
    answersArray: { answer: string; arrayPosition: number }[]
    handleChoice: (question: string, answer: string | number | string[]) => void
    goBackOneStep: () => void
}

const RankingQuestion: React.FC<RankingQuestionProps> = (props) => {
    const {
        currentStep,
        renderOnStep,
        question,
        answersArray,
        handleChoice,
        goBackOneStep,
    } = props
    const [list, setList] = useState<string[]>([
        ...answersArray.map((answer) => answer.answer),
    ])
    const listRef = useRef<HTMLDivElement>(null)
    const { language } = useContext(LanguageContext)
    const [usingCustomKeys, setUsingCustomKeys] = useState<boolean>(false)

    const customKeys = useCustomKeys({
        swipeUp: 'w',
        swipeDown: 's',
        swipeLeft: '',
        swipeRight: '',
    })

    // handles input for changing ranking order
    useEffect(() => {
        if (usingCustomKeys) {
            console.log('Using custom keys')

            const handleSliderKeys = (event: KeyboardEvent) => {
                switch (event.key) {
                    case 'w':
                        console.log('w')

                        break
                    case 's':
                        console.log('s')

                        break
                    default:
                        break
                }
            }
            document.addEventListener('keydown', handleSliderKeys)
            return () => {
                document.removeEventListener('keydown', handleSliderKeys)
                console.log('Stopped using custom keys')
            }
        }
    }, [usingCustomKeys])

    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="w-4/5 h-screen relative">
                    <div>
                        <BackButton
                            currentStep={currentStep}
                            onClick={() =>
                                setTimeout(() => {
                                    goBackOneStep()
                                }, 200)
                            }
                        />
                        <div className="absolute top-32">
                            <div className="text-3xl leading-10 font-medium">
                                {question}
                            </div>
                            <div className="font-normal text-gray-600 mt-2">
                                {language === 'Danish'
                                    ? 'Arrangér svarene i rækkefølge hvor 1 er størst'
                                    : 'Arrange the answers in order where 1 is greatest'}
                            </div>
                            <div className="flex row-auto text-lg font-normal mt-10 w-full">
                                <div className="flex flex-col justify-between mr-6 py-5">
                                    {list.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="mb-5 text-blue-500"
                                            >
                                                {index + 1}
                                            </div>
                                        )
                                    })}
                                </div>
                                <div ref={listRef} className="w-full">
                                    {list.map((item, index) => {
                                        return (
                                            <Touchless
                                                startElement={true}
                                                className={
                                                    'shadow-inactive rounded-xl flex items-center bg-white p-4 py-3 mb-5 w-full border-4 border-transparent'
                                                }
                                                onClick={(e) => {
                                                    if (!usingCustomKeys) {
                                                        customKeys.initiate()
                                                        setUsingCustomKeys(true)
                                                    } else {
                                                        customKeys.clear()
                                                        setUsingCustomKeys(
                                                            false
                                                        )
                                                    }
                                                }}
                                            >
                                                <img
                                                    src={Arrows}
                                                    alt="arrows"
                                                    className="mr-4"
                                                />
                                                <span>{item}</span>
                                            </Touchless>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <NextButton
                            currentStep={currentStep}
                            onClick={() =>
                                setTimeout(
                                    () => handleChoice(question, 'h'),
                                    200
                                )
                            }
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default RankingQuestion
