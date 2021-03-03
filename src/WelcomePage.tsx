import React from 'react';

export interface WelcomePageProps {
    currentStep: number;
    renderOnStep: number;
    startOnPhoneConnection: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = (props) => {
    const { currentStep, renderOnStep, startOnPhoneConnection } = props;

    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="w-full h-screen flex flex-col relative justify-start pt-40 px-48">
                    <div className="text-4xl leading-10 font-medium mb-5">
                        Try the public display of the future while answering a short questionnaire
                    </div>
                    <div className="font-normal text-gray-600 mt-2 w-96">
                        Scan the QR code with your phone and follow the instructions to get started
                    </div>
                    <div onClick={startOnPhoneConnection} className={`${buttonStyle} w-80 h-80 text-center pt-36 mt-20`}>
                        QR code goes here
                    </div>
                </div>
            )}
        </>
    );
};

export default WelcomePage;

const buttonStyle =
    'shadow-inactive focus:shadow-focused focus:border-blue-500 border-4 border-transparent focus:outline-none rounded-xl active:scale-90 animate transition transform';
