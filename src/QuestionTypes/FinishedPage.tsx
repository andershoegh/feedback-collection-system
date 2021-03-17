import React, { useContext } from 'react'
import { Touchless } from 'touchless-navigation'
import BackButton from '../BackButton'
import { LanguageContext } from '../QuestionSettings'

export interface FinishedPageProps {
    currentStep: number
    renderOnStep: number
    text: string
    subText: string
    goBackOneStep: () => void
    logAndReset: () => void
}

const FinishedPage: React.FC<FinishedPageProps> = (props) => {
    const { currentStep, renderOnStep, text, subText, goBackOneStep } = props
    const { language } = useContext(LanguageContext);

    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="w-4/5 h-screen relative flex items-center justify-center">
                    <div className="my-10">
                        <BackButton
                            currentStep={currentStep}
                            onClick={() => goBackOneStep()}
                        />
                    </div>
                    <div className="">
                        <div className="text-3xl leading-10 font-medium">
                            {text}
                        </div>
                        <div className="font-normal text-gray-600 mt-2">
                            {subText}
                        </div>
                        <Touchless
                            startElement={true}
                            onClick={() =>
                                (window.location.href =
                                    'https://andershansen393483.typeform.com/to/DaDEYAf6')
                            }
                            className={`shadow-inactive py-6 px-32 text-3xl border-4 border-transparent rounded-xl my-8`}
                        >
                            {
                                language.trim() ===   'Danish'.trim() 
                                                    ? 'Hjælp os ved at give feedback'  
                                                    : 'Help us by giving feedback'
                            }
                        </Touchless>
                    </div>
                </div>
            )}
        </>
    )
}

export default FinishedPage

