import React from 'react';
import { MobileQR, Touchless } from 'touchless-navigation';
import { buttonStyle } from './QuestionSettings';
import DKFlag from './Resources/DKFlag';
import GBFlag from './Resources/GBFlag';

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
                                    {showQR
                                        ? `Scan QR koden med din telefon og åbn linket for at begynde at styre siden med din telefon.`
                                        : `Placér din hånd foran skærmen og "tryk" på knappen herunder for at begynde at styre siden kontaktløst. Følg anvisningerne til venstre for mere hjælp.`}
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
                                    {showQR
                                        ? `Scan the QR code with your phone and open the link to start controlling the site with your phone.`
                                        : `Place your hand in front of the screen and "press" the button below to start controlling the site. Follow the instructions on the left for more help.`}
                                </div>
                            </div>
                        </div>

                        <div>
                            <Touchless
                                onClick={startQuestionnaire}
                                className={`${buttonStyle} w-80 h-80 text-center justify-center place-items-center flex mt-4`}
                            >
                                {!showQR ? (
                                    <MobileQR logLink={true} />
                                ) : (
                                    <h2 className="text-xl font-black">
                                        TRYK HER FOR AT STARTE
                                    </h2>
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
