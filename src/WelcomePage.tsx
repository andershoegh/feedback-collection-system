import React from 'react'
import { MobileQR } from 'touchless-navigation'
import DKFlag from './Resources/DKFlag'
import GBFlag from './Resources/GBFlag'

export interface WelcomePageProps {
    currentStep: number
    renderOnStep: number
    startOnPhoneConnection: () => void
}

const WelcomePage: React.FC<WelcomePageProps> = (props) => {
    const { currentStep, renderOnStep, startOnPhoneConnection } = props

    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="h-screen w-2/3 flex place-items-center">
                    <div>
                        <div className="">
                            <div className="mb-10">
                                <div className="place-items-center flex w-10 h-10">
                                    <DKFlag />
                                </div>
                                <div className="text-xl leading-10 font-normal mb-2">
                                    Prøv de nye kontaktløse skærme ved at
                                    udfylde et kort spørgeskema
                                </div>
                                <div className="font-normal text-gray-600">
                                    Scan QR koden med din telefon og følg
                                    instruktionerne for at komme i gang
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="place-items-center flex w-10 h-10">
                                    <GBFlag />
                                </div>
                                <div className="text-xl leading-10 font-normal mb-2">
                                    Try the public display of the future while
                                    answering a short questionnaire
                                </div>
                                <div className="font-normal text-gray-600">
                                    Scan the QR code with your phone and follow
                                    the instructions to get started
                                </div>
                            </div>
                        </div>
                        <div className=" font-bold text-red-600 border-1 border-red-300">
                            Remember this is a system test - the following
                            questions are meant for another context. Do not
                            worry about answering these questions correctly.
                        </div>
                        <div className="font-bold text-red-600 mt-2">
                            Once you have scanned the QR code - do not use the
                            keyboard or mouse.
                        </div>
                        <div>
                            <div
                                onClick={startOnPhoneConnection}
                                className={`${buttonStyle} w-72 h-72 text-center justify-center place-items-center flex mt-4`}
                            >
                                <MobileQR />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default WelcomePage

const buttonStyle =
    'shadow-inactive focus:shadow-focused focus:border-blue-500 border-4 border-transparent focus:outline-none rounded-xl active:scale-90 animate transition transform'
