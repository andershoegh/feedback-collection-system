import React from 'react';
import BackButton from '../BackButton';

export interface FinishedPageProps {
    currentStep: number;
    renderOnStep: number;
    text: string;
    subText: string;
    goBackOneStep: () => void;
}

const FinishedPage: React.FC<FinishedPageProps> = (props) => {
    const { currentStep, renderOnStep, text, subText, goBackOneStep } = props;

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
                </div>
            )}
        </>
    );
};

export default FinishedPage;
