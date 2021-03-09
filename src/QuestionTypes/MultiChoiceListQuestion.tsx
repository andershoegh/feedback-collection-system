import { CheckSquare, Square } from 'phosphor-react';
import React, { useState, useContext } from 'react';
import { Touchless } from 'touchless-navigation';
import BackButton from '../BackButton';
import NextButton from '../NextButton';
import { LanguageContext } from '../QuestionSettings';

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
                <div className='w-4/5 relative h-screen'>
                    <BackButton
                        currentStep={currentStep}
                        onClick={() =>
                            setTimeout(() => {
                                goBackOneStep();
                            }, 200)
                        }
                    />

                    <div className='absolute top-32'>
                        <div className='text-3xl leading-10 font-bold'>{question}</div>
                        <div className='mt-2 text-gray-600'>
                            {language === 'Danish' ? 'Du kan vælge mere end ét svar' : 'You can choose more than one answer'}
                        </div>
                        <ul className=' w-11/12 mt-10 text-lg font-normal'>
                            {answersArray.map((answer) => {
                                return (
                                    <Checkbox
                                        key={answer}
                                        answer={answer}
                                        updateAnswers={(answer) => {
                                            setAnswers((prev) => [...prev, answer]);
                                        }}
                                    />
                                );
                            })}
                        </ul>
                    </div>
                    <NextButton currentStep={currentStep} onClick={() => handleChoice(question, answers)} />
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
            className={`shadow-inactive rounded-xl pl-4 py-3 mb-5 flex place-items-center border-4 border-transparent ${
                checked ? 'bg-blue-100' : ''
            }`}
            onClick={() => {
                setChecked(!checked);
                updateAnswers(answer);
            }}
        >
            {checked ? (
                <CheckSquare size={28} weight='bold' color={'#127FBF'} />
            ) : (
                <Square size={28} weight='bold' color={'#127FBF'} />
            )}
            <li className='ml-4'>{answer}</li>
        </Touchless>
    );
};
