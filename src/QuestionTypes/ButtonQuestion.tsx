import React, { useContext } from 'react';
import BackButton from '../BackButton';
import { Touchless } from 'touchless-navigation';
import { LanguageContext } from '../QuestionSettings';

export interface ButtonQuestionProps {}

const ButtonQuestion: React.SFC<{
    currentStep: number;
    renderOnStep: number;
    question: string;
    firstButtonText: string;
    secondButtonText: string;
    goBackOneStep: () => void;
    handleChoice: (
        question: string,
        answer: string | number | string[]
    ) => void;
}> = ({
    currentStep,
    renderOnStep,
    question,
    firstButtonText,
    secondButtonText,
    handleChoice,
    goBackOneStep,
}) => {
    const { language } = useContext(LanguageContext);
    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="w-4/5 h-screen relative flex items-center justify-center">
                    <div className="mb-10 mt-4">
                        <BackButton
                            currentStep={currentStep}
                            onClick={() =>
                                setTimeout(() => {
                                    goBackOneStep();
                                }, 200)
                            }
                        />
                    </div>
                    <div className="">
                        <div className="text-5xl leading-10 font-medium">
                            {question}
                        </div>
                        <div className="mt-6 text-2xl text-gray-600">
                            {language === 'Danish' ? 'Vælg én' : 'Choose one'}
                        </div>
                        <div className="flex justify-center mt-40">
                            <Touchless
                                startElement={true}
                                onClick={() =>
                                    setTimeout(() => {
                                        handleChoice(question, firstButtonText);
                                    }, 200)
                                }
                                className={`shadow-inactive py-8 px-40 text-4xl border-4 border-transparent rounded-xl m-4`}
                            >
                                {firstButtonText}
                            </Touchless>

                            <Touchless
                                onClick={() =>
                                    handleChoice(question, secondButtonText)
                                }
                                className={`shadow-inactive py-8 px-40 text-4xl border-4 border-transparent rounded-xl m-4`}
                            >
                                {secondButtonText}
                            </Touchless>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ButtonQuestion;
