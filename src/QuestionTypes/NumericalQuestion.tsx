import { Backspace } from 'phosphor-react';
import React, { useState, useContext } from 'react';
import { Touchless } from 'touchless-navigation';
import BackButton from '../BackButton';
import NextButton from '../NextButton';
import { LanguageContext } from '../QuestionSettings';

const concatAmount = (oldAmount: string, newAmount: string) => oldAmount.trim() === '0'.trim() ? newAmount : oldAmount.concat(newAmount);
const numbersArray: readonly number[]  = Object.freeze([1,2,3,4,5,6,7,8,9,0]);

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
    const buttonGenerator = (i: number) => (<Touchless
        startElement={i===1}
        onClick={() => setAmount(concatAmount(amount, i.toString()))}
        className={`shadow-inactive rounded-xl text-center px-10 py-8 border-4 border-transparent w-full h-full number-${i}`}
        key={i+'key'}
        
    >
        {i}
    </Touchless>)
    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="w-4/5 h-screen relative flex items-center justify-center ">
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
                            {language === 'Danish'
                                ? 'Indtast antal'
                                : 'Input amount'}
                        </div>
                        <div className="flex justify-center mt-8 font-medium text-8xl text-blue-600">
                            <span className="">
                                {amount}
                            </span>
                            <span className="animate-pulse font-light">|</span>
                        </div>
                        
                        <div className="grid-cols-3  grid w-96 gap-3 mt-20 justify-items-center mx-auto text-4xl font-medium">

                            { numbersArray.map((num)=> buttonGenerator(num) ) }

                            <Touchless
                                onClick={() =>{
                                    setAmount(
                                        amount.substring(0, amount.length - 1)
                                    )}
                                }
                                className={`shadow-inactive rounded-xl px-10 h-full w-full mx-auto border-4 border-transparent col-span-2 flex items-center font-normal text-3xl number-del`}
                            >
                                <Backspace className="mr-3" />
                                {language === 'Danish' ? 'Slet' : 'Delete'}
                            </Touchless>
                        </div>
                    </div>
                    <NextButton
                        currentStep={currentStep}
                        onClick={() =>
                            setTimeout(() => {
                                handleChoice(question, amount);
                            }, 200)
                        }
                    />
                </div>
            )}
        </>
    );
};

export default NumericalQuestion;
