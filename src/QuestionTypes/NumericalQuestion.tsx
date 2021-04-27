import { Backspace } from 'phosphor-react';
import React, { useState, useContext } from 'react';
import { Touchless } from 'touchless-navigation';
import BackButton from '../BackButton';
import NextButton from '../NextButton';
import { LanguageContext } from '../QuestionSettings';

export interface NumericalQuestionProps {}

const NumericalQuestion: React.SFC<{
    currentStep: number;
    renderOnStep: number;
    question: string;
    handleChoice: (question: string, answer: string) => void;
    goBackOneStep: () => void;
}> = ({ currentStep, renderOnStep, question, handleChoice, goBackOneStep }) => {
    const [amount, setAmount] = useState<string>('');
    const { language } = useContext(LanguageContext);

    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="w-4/5 h-screen relative flex items-center justify-center">
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
                                ? 'Indtast antal'
                                : 'Input amount'}
                        </div>
                        <div className="flex justify-center mt-8 font-medium text-8xl text-blue-600">
                            <span className="">
                                {amount === '0' ? '' : amount}{' '}
                            </span>
                            <span className="animate-pulse font-light">|</span>
                        </div>
                        <div className="grid-cols-3  grid w-96 gap-3 mt-20 justify-items-center mx-auto text-4xl font-medium">
                            <Touchless
                                startElement={true}
                                onClick={() => setAmount(amount + '1')}
                                className={`shadow-inactive rounded-xl px-12 py-8 border-4 border-transparent`}
                            >
                                1
                            </Touchless>

                            <Touchless
                                onClick={() => setAmount(amount + '2')}
                                className={`shadow-inactive rounded-xl px-12 py-8 border-4 border-transparent`}
                            >
                                2
                            </Touchless>

                            <Touchless
                                onClick={() => setAmount(amount + '3')}
                                className={`shadow-inactive rounded-xl px-12 py-8 border-4 border-transparent`}
                            >
                                3
                            </Touchless>

                            <Touchless
                                onClick={() => setAmount(amount + '4')}
                                className={`shadow-inactive rounded-xl px-12 py-8 border-4 border-transparent`}
                            >
                                4
                            </Touchless>

                            <Touchless
                                onClick={() => setAmount(amount + '5')}
                                className={`shadow-inactive rounded-xl px-12 py-8 border-4 border-transparent`}
                            >
                                5
                            </Touchless>

                            <Touchless
                                onClick={() => setAmount(amount + '6')}
                                className={`shadow-inactive rounded-xl px-12 py-8 border-4 border-transparent`}
                            >
                                6
                            </Touchless>

                            <Touchless
                                onClick={() => setAmount(amount + '7')}
                                className={`shadow-inactive rounded-xl px-12 py-8 border-4 border-transparent`}
                            >
                                7
                            </Touchless>

                            <Touchless
                                onClick={() => setAmount(amount + '8')}
                                className={`shadow-inactive rounded-xl px-12 py-8 border-4 border-transparent`}
                            >
                                8
                            </Touchless>

                            <Touchless
                                onClick={() => setAmount(amount + '9')}
                                className={`shadow-inactive rounded-xl px-12 py-8 border-4 border-transparent`}
                            >
                                9
                            </Touchless>

                            <Touchless
                                onClick={() => setAmount(amount + '0')}
                                className={`shadow-inactive rounded-xl px-12 py-8 border-4 border-transparent`}
                            >
                                0
                            </Touchless>

                            <Touchless
                                onClick={() =>
                                    setAmount(
                                        amount.substring(0, amount.length - 1)
                                    )
                                }
                                className={`shadow-inactive rounded-xl px-20 py-3 border-4 border-transparent col-span-2 flex items-center font-normal text-3xl`}
                            >
                                <Backspace className="mr-2" />
                                {language === 'Danish' ? 'Slet' : 'Delete'}
                            </Touchless>
                        </div>
                    </div>
                    <NextButton
                        currentStep={currentStep}
                        onClick={() => handleChoice(question, amount)}
                    />
                </div>
            )}
        </>
    );
};

export default NumericalQuestion;
