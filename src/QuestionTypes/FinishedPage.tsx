import React, { useContext, useState, useEffect, useRef } from 'react';
import {
    Touchless,
    useRedirectPhone,
    useNewSession,
} from 'touchless-navigation';
import { InteractionType } from '../App';
import BackButton from '../BackButton';
import { LanguageContext, animateClick } from '../QuestionSettings';
import PhoneHighlightQR from '../Resources/PhoneHighlight.gif';
import PhoneFreeCursorQR from '../Resources/PhoneFreeCursor.gif';
import LeapMotionQR from '../Resources/LeapMotion.gif';

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
    const RESET_DELAY = 90 * 1000;
    let resetInterval = useRef<ReturnType<typeof setInterval>>();
    const [countdown, setCountdown] = useState<number>(RESET_DELAY);
    const isUsingPhone = interactionType.substr(0, 5) === 'phone';

    const getRedirectLink = () => {
        let link = '';
        if (interactionType === 'leapMotion') {
            link = 'https://www.survey-xact.dk/LinkCollector?key=8MY9KEZ5SP3P';
        }
        if (interactionType === 'phoneCursor') {
            link = 'https://www.survey-xact.dk/LinkCollector?key=M8N9VXRPJPCJ';
        }
        if (interactionType === 'phoneHighlight') {
            link = 'https://www.survey-xact.dk/LinkCollector?key=JF64NTP2L19P';
        }

        return link;
    };
    const REDIRECT_LINK = getRedirectLink();

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

    const redirectClick = (e: React.MouseEvent<HTMLDivElement | MouseEvent, MouseEvent>) => {
        const modal: HTMLDivElement | null = document.querySelector('#modal');
        animateClick(e);
        redirectPhone(REDIRECT_LINK);

        setTimeout(()=> 
        modal?.animate({
            transform: ['translateY(0)', 'translateY(-120%)'],
            opacity: ['0', '1'],
        }, {
            fill: 'forwards',
            easing: 'ease-in-out',
            duration: 350,
        }), 400
        )

        setTimeout(() => {
            newSession();
            logAndReset();
        }, 6500);
    }

    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="w-4/5 h-screen relative flex items-center justify-center overflow-hidden">
                    <div id='modal' className='absolute top-full left-0 z-10 shadow-inactive py-14 px-12 text-3xl text-center rounded-xl bg-green-400'>
                        <span className='pr-8'>✓</span> Spørgeskemaet er nu klar på din telefon
                    </div>
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
                        <div className="font-normal text-gray-600 mt-6 text-3xl w-3/4 pb-10">
                            {subText}
                        </div>
                        {isUsingPhone ? (
                            <Touchless
                                startElement={true}
                                onClick={(e) => {
                                    redirectClick(e);
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
                                {interactionType === 'leapMotion' ? (
                                    <img
                                        src={LeapMotionQR}
                                        alt="Leap Motion Survey QR"
                                    />
                                ) : null}
                                {interactionType === 'phoneCursor' ? (
                                    <img
                                        src={PhoneFreeCursorQR}
                                        alt="Phone Free Survey QR"
                                    />
                                ) : null}
                                {interactionType === 'phoneHighlight' ? (
                                    <img
                                        src={PhoneHighlightQR}
                                        alt="Phone Highlight Survey QR"
                                    />
                                ) : null}
                            </Touchless>
                        )}
                    </div>
                    <div className="absolute bottom-10 right-0 left-0">
                        {language.trim() === 'Danish'.trim()
                            ? `Gør klar til en ny besvarelse om ${countdown} sekunder`
                            : `Getting ready for another reply in ${countdown} seconds`}
                    </div>
                </div>
            )}
        </>
    );
};

export default FinishedPage;
