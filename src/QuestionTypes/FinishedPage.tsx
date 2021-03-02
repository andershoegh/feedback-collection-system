import React, { useEffect, useState } from 'react';
import BackButton from '../BackButton';

export interface FinishedPageProps {
    currentStep: number;
    renderOnStep: number;
    text: string;
    subText: string;
    goBackOneStep: () => void;
    logAndReset: () => void;
}

const FinishedPage: React.FC<FinishedPageProps> = (props) => {
    const { currentStep, renderOnStep, text, subText, goBackOneStep, logAndReset } = props;
    const [timer, setTimer] = useState<number>(10);

    useEffect(() => {
        let timeLeft = 10;
        setTimer(timeLeft);
        let x = setInterval(() => {
            if (currentStep === renderOnStep) {
                setTimer(timeLeft);

                if (timeLeft < 1) {
                    clearInterval(x);
                    logAndReset();
                }
                timeLeft--;
            }
        }, 1000);

        return () => {
            clearInterval(x);
        };
    }, [currentStep, renderOnStep]);

    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="w-4/5 h-screen relative">
                    <div className="my-10">
                        <BackButton currentStep={currentStep} onClick={() => goBackOneStep()} />
                    </div>
                    <div className="absolute top-32">
                        <div className="text-3xl leading-10 font-medium">{text}</div>
                        <div className="font-normal text-gray-600 mt-2">{subText}</div>
                    </div>
                    <div className="absolute bottom-10 right-0 left-0">🚀 Resetting in T minus {timer}</div>
                </div>
            )}
        </>
    );
};

export default FinishedPage;
