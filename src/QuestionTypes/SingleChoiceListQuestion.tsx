import React, { useContext } from 'react';
import { Touchless } from 'touchless-navigation';
import BackButton from '../BackButton';
import { LanguageContext } from '../QuestionSettings';

export interface SingleChoiceListQuestionProps {
    currentStep: number;
    renderOnStep: number;
    question: string;
    answersArray: string[];
    handleChoice: (question: string, answer: string) => void;
    goBackOneStep: () => void;
}

const SingleChoiceListQuestion: React.SFC<SingleChoiceListQuestionProps> = ({
    currentStep,
    renderOnStep,
    question,
    answersArray,
    handleChoice,
    goBackOneStep,
}) => {
    const { language } = useContext(LanguageContext);

    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="w-4/5 relative h-screen flex items-center justify-center">
                    <BackButton
                        currentStep={currentStep}
                        onClick={() =>
                            setTimeout(() => {
                                goBackOneStep();
                            }, 200)
                        }
                    />
                    <div className="">
                        <div className="text-5xl leading-10 font-medium">
                            {question}
                        </div>
                        <div className="mt-6 text-2xl text-gray-600">
                            {language === 'Danish' ? 'Vælg én' : 'Choose one'}
                        </div>
                        <ul className="w-3/5 mt-10 text-lg font-normal">
                            {answersArray.map((answer, i) => {
                                return (
                                    <Touchless
                                        className={`shadow-inactive rounded-xl pl-4 py-6 mb-5 border-4 text-2xl border-transparent`}
                                        key={answer}
                                        startElement={i === 0}
                                        onClick={() =>
                                            setTimeout(() => {
                                                handleChoice(question, answer);
                                            }, 200)
                                        }
                                    >
                                        {answer}
                                    </Touchless>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default SingleChoiceListQuestion;
