import React, { useContext, useState, useEffect, useRef } from 'react';
import {
    Touchless,
    useRedirectPhone,
    useNewSession,
} from 'touchless-navigation';
import { InteractionType } from '../App';
import BackButton from '../BackButton';
import { LanguageContext, animateClick } from '../QuestionSettings';
import surveyQR from '../Resources/surveyQR.gif';

export interface FinishedPageProps {
    currentStep: number;
    renderOnStep: number;
    text: string;
    subText: string;
    goBackOneStep: () => void;
    interactionType: InteractionType;
    logAndReset: () => void;
}

const FinishedPage: React.FC<FinishedPageProps> = (props) => {
    const {
        currentStep,
        renderOnStep,
        text,
        subText,
        goBackOneStep,
        interactionType,
        logAndReset,
    } = props;
    const { language } = useContext(LanguageContext);
    const redirectPhone = useRedirectPhone();
    const newSession = useNewSession();
    const RESET_DELAY = 30 * 1000;
    let resetInterval = useRef<ReturnType<typeof setInterval>>();
    const [countdown, setCountdown] = useState<number>(RESET_DELAY);
    const isUsingPhone = interactionType.substr(0, 5) === 'phone';

    useEffect(() => {
        if (currentStep === renderOnStep) {
            let timeLeft = RESET_DELAY / 1000;
            setCountdown(timeLeft);
            resetInterval.current = setInterval(() => {
                setCountdown(timeLeft);

                if (timeLeft < 1) {
                    clearInterval(resetInterval.current!);
                    logAndReset();
                }

                timeLeft--;
            }, 1000);
        } else {
            clearInterval(resetInterval.current!);
        }

        return () => {
            clearInterval(resetInterval.current!);
        };
    }, [currentStep, renderOnStep, RESET_DELAY, logAndReset]);

    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="w-4/5 h-screen relative flex items-center justify-center">
                    <div className="my-10">
                        <BackButton
                            currentStep={currentStep}
                            onClick={goBackOneStep}
                        />
                    </div>
                    <div className="">
                        <div className="text-5xl leading-10 font-medium">
                            {text}
                        </div>
                        <div className="font-normal text-gray-600 mt-6 text-2xl w-3/4">
                            {subText}
                        </div>
                        {isUsingPhone ? (
                            <Touchless
                                startElement={true}
                                onClick={(e) => {
                                    animateClick(e);
                                    redirectPhone(
                                        'https://www.survey-xact.dk/LinkCollector?key=JF64NTP2L19P'
                                    );
                                    newSession();
                                    setTimeout(() => logAndReset(), 200);
                                }}
                                className={`shadow-inactive py-6 px-32 text-3xl max-w-2xl border-4 border-transparent rounded-xl my-8`}
                            >
                                {language.trim() === 'Danish'.trim()
                                    ? 'Hjælp os ved at give feedback'
                                    : 'Help us by giving feedback'}
                            </Touchless>
                        ) : (
                            <Touchless
                                className={`shadow-inactive w-1/3 p-0.5 text-3xl border-4 border-transparent rounded-xl my-8`}
                            >
                                <img src={surveyQR} alt="survey QR code" />
                            </Touchless>
                        )}
                    </div>
                    <div className="absolute bottom-10 right-0 left-0">
                        {language.trim() === 'Danish'.trim()
                            ? `Gør klar til en ny besvarelse om ${countdown}`
                            : `Getting ready for another reply in ${countdown}`}
                    </div>
                </div>
            )}
        </>
    );
};

export default FinishedPage;
