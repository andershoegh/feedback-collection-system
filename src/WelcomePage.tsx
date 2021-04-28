import React from 'react';
import { MobileQR, Touchless } from 'touchless-navigation';
import { buttonStyle } from './QuestionSettings';

export interface WelcomePageProps {
    currentStep: number;
    renderOnStep: number;
    startQuestionnaire: () => void;
    showQR: boolean;
}

const WelcomePage: React.FC<WelcomePageProps> = (props) => {
    const { currentStep, renderOnStep, startQuestionnaire, showQR } = props;

    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="h-screen w-full ml-32 flex place-items-center">
                    <div>
                        <div className="">
                            {/* <div className="mb-10 flex place-items-center">
                                <div className="place-items-center flex w-20 h-20 mb-2 mr-5">
                                    <DKFlag />
                                </div>
                                <div>
                                    <div className="text-3xl leading-10 font-normal mb-4">
                                        Prøv de nye kontaktløse skærme ved at
                                        udfylde et kort spørgeskema
                                    </div>
                                </div>
                            </div>

                            <div className="mb-10 flex place-items-center">
                                <div className="place-items-center flex w-20 h-20 mb-2 mr-5">
                                    <GBFlag />
                                </div>
                                <div>
                                    <div className="text-3xl leading-10 font-normal mb-4">
                                        Try the public display of the future
                                        while answering a short questionnaire
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        {showQR ? (
                            <div className="text-gray-900 mb-20">
                                <div className="text-3xl ">
                                    Scan QR koden med din telefons kamera app
                                    for at starte den kontaktløse skærm
                                </div>
                                <div className="text-xl mt-4">
                                    Scan the QR code with your phones camera app
                                    to start the touchless display
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-900 mb-20">
                                <div className="text-3xl ">
                                    Hold hånden op foran skærmen - klik på
                                    firkanten ved at føre fingeren frem
                                </div>
                                <div className="text-xl mt-4">
                                    Hold your hand up in front of the screen -
                                    click the square by moving your finger
                                    forward
                                </div>
                            </div>
                        )}

                        <div>
                            <Touchless
                                onClick={startQuestionnaire}
                                className={`${buttonStyle} w-80 h-80 text-center justify-center place-items-center flex mt-4`}
                            >
                                {!showQR ? (
                                    <MobileQR logLink={true} />
                                ) : (
                                    <div className="font-bold text-blue-500 text-xl">
                                        Klik her for at starte
                                    </div>
                                )}
                            </Touchless>
                        </div>

                        <div className="mt-40 text-gray-600 ">
                            <div className="mb-2">
                                Det er et krav at udfylde spørgeskemaet efter
                                brug af systemet for at kunne deltage i
                                konkurrencen om gavekortet.
                            </div>
                            <div>
                                It is a requirement to fill out the
                                questionnaire after using the system to be able
                                to participate in the gift card competition.
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default WelcomePage;
