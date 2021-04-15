import React from 'react';
import { MobileQR } from 'touchless-navigation';
import DKFlag from './Resources/DKFlag';
import GBFlag from './Resources/GBFlag';

export interface WelcomePageProps {
    currentStep: number;
    renderOnStep: number;
    startOnPhoneConnection: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = (props) => {
    const { currentStep, renderOnStep } = props;
    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="h-screen w-2/3 flex place-items-center">
                    <div>
                        <div className="">
                            <div className="mb-10">
                                <div className="place-items-center flex w-20 h-20 mb-2">
                                    <DKFlag />
                                </div>
                                <div className="text-4xl leading-10 font-normal mb-4">
                                    Prøv de nye kontaktløse skærme ved at
                                    udfylde et kort spørgeskema
                                </div>
                                <div className="font-normal text-xl text-gray-600">
                                    Scan QR koden med din telefon og åbn linket
                                    for at begynde at styre siden med din
                                    telefon.
                                </div>
                            </div>

                            <div className="mb-40">
                                <div className="place-items-center flex w-20 h-20 mb-2">
                                    <GBFlag />
                                </div>
                                <div className="text-4xl leading-10 font-normal mb-4">
                                    Try the public display of the future while
                                    answering a short questionnaire
                                </div>
                                <div className="font-normal text-xl text-gray-600">
                                    Scan the QR code with your phone and open
                                    the link to start controlling the site with
                                    your phone.
                                </div>
                            </div>
                        </div>

                        <div>
                            <div
                                // onClick={startOnPhoneConnection}
                                className={`${buttonStyle} w-80 h-80 text-center justify-center place-items-center flex mt-4`}
                            >
                                <MobileQR />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default WelcomePage;

const buttonStyle =
    'shadow-inactive focus:shadow-focused focus:border-blue-500 border-4 border-transparent focus:outline-none rounded-xl active:scale-90 animate transition transform';
