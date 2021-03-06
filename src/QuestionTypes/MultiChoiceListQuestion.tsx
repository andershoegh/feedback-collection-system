import { CheckSquare, Square } from 'phosphor-react';
import React, { useState, useContext } from 'react';
import { Touchless } from 'touchless-navigation';
import BackButton from '../BackButton';
import NextButton from '../NextButton';
import { animateClick, LanguageContext } from '../QuestionSettings';

export interface MultiChoiceListQuestionProps {
    currentStep: number;
    renderOnStep: number;
    question: string;
    answersArray: string[];
    handleChoice: (question: string, answer: string[]) => void;
    goBackOneStep: () => void;
}

const MultiChoiceListQuestion: React.SFC<MultiChoiceListQuestionProps> = ({
    currentStep,
    renderOnStep,
    question,
    answersArray,
    handleChoice,
    goBackOneStep,
}) => {
    const [answers, setAnswers] = useState<string[]>([]);
    const { language } = useContext(LanguageContext);

    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="w-4/5 relative h-screen flex items-center justify-center">
                    <BackButton
                        currentStep={currentStep}
                        onClick={goBackOneStep}
                    />

                    <div className="">
                        <div className="text-5xl leading-10 font-medium">
                            {question}
                        </div>
                        <div className="mt-6 text-2xl text-gray-600">
                            {language === 'Danish'
                                ? 'Du kan vælge mere end ét svar'
                                : 'You can choose more than one answer'}
                        </div>
                        <ul className=" w-11/12 mt-10 text-2xl font-normal">
                            {answersArray.map((answer) => {
                                return (
                                    <Checkbox
                                        key={answer}
                                        answer={answer}
                                        updateAnswers={(answer) => {
                                            setAnswers((prev) => [
                                                ...prev,
                                                answer,
                                            ]);
                                        }}
                                    />
                                );
                            })}
                        </ul>
                    </div>
                    <NextButton
                        currentStep={currentStep}
                        onClick={() => handleChoice(question, answers)}
                    />
                </div>
            )}
        </>
    );
};

export default MultiChoiceListQuestion;

export interface CheckboxProps {
    answer: string;
    updateAnswers: (answer: string) => void;
}

const Checkbox: React.SFC<CheckboxProps> = ({ answer, updateAnswers }) => {
    const [checked, setChecked] = useState(false);
    return (
        <Touchless
            className={`shadow-inactive rounded-xl pl-4 py-6 mb-5 flex place-items-center border-4 border-transparent ${
                checked ? 'bg-blue-100' : ''
            }`}
            startElement={true}
            onClick={(e) => {
                animateClick(e);
                setChecked(!checked);
                updateAnswers(answer);
            }}
        >
            {checked ? (
                <CheckSquare size={28} weight="bold" color={'#127FBF'} />
            ) : (
                <Square size={28} weight="bold" color={'#127FBF'} />
            )}
            <li className="ml-4">{answer}</li>
        </Touchless>
    );
};
