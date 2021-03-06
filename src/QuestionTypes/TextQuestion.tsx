import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
    useContext,
} from 'react';
import { Touchless } from 'touchless-navigation';
import BackButton from '../BackButton';
import NextButton from '../NextButton';
import { LanguageContext } from '../QuestionSettings';
import './TextQuestion.css';

export interface TextQuestionProps {
    currentStep: number;
    renderOnStep: number;
    question: string;
    handleChoice: (
        question: string,
        answer: string | number | string[]
    ) => void;
    goBackOneStep: () => void;
}

const TextQuestion: React.FC<TextQuestionProps> = (props) => {
    const {
        currentStep,
        renderOnStep,
        question,
        handleChoice,
        goBackOneStep,
    } = props;
    const [answer] = useState<string>('text answer from the phone');
    const [getAnswerText, setGetAnswerText] = useState(
        'Waiting for an answer from your phone'
    );
    const [redoAnswer, setRedoAnswer] = useState(false);
    const dotsRef = useRef<HTMLDivElement>(null);
    const { language } = useContext(LanguageContext);

    const playAnimation = useCallback(() => {
        const answerReceived = () => {
            if (dotsRef.current) {
                dotsRef.current.childNodes.forEach((child, index) => {
                    const c = child as HTMLDivElement;

                    // Setting check animations
                    if (c.classList.contains('dot')) {
                        const dotAnimationDuration = ['.5s', '1.4s', '.5s'];
                        const delay = index === 2 ? '.3s' : '0s';
                        c.style.animation = `completeDot${index} ${dotAnimationDuration[index]} ${delay} forwards`;
                    } else {
                        c.style.display = 'inline';
                    }
                });
            }

            // Setting the correct display message and showing the redo-button
            setTimeout(
                () =>
                    setGetAnswerText(
                        language === 'Danish'
                            ? 'Svar modtaget!'
                            : 'Answer received!'
                    ),
                1300
            );
            setTimeout(() => setRedoAnswer(true), 1700);
        };

        if (dotsRef.current) {
            dotsRef.current.childNodes.forEach((child, index) => {
                const c = child as HTMLDivElement;

                // Setting waiting animation on each dot and hiding the checkmark
                if (c.classList.contains('dot')) {
                    c.style.animation = `dotTyping 2s infinite ${index * 0.1}s`;
                } else {
                    c.style.display = 'none';
                }
            });
        }

        // Setting the correct display message and hiding the redo-button
        setGetAnswerText(
            language === 'Danish'
                ? 'Venter på et svar fra din telefon'
                : 'Waiting for an answer from your phone'
        );
        setRedoAnswer(false);

        // Auto-runs the answerReceived after 5s - for testing
        setTimeout(() => {
            answerReceived();
        }, 5000);
    }, [language]);

    // useEffect for running the animation on page load
    useEffect(() => {
        if (currentStep === renderOnStep) {
            playAnimation();
        }
    }, [currentStep, renderOnStep, playAnimation]);

    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="w-4/5 h-screen relative flex items-center justify-center">
                    <BackButton
                        currentStep={currentStep}
                        onClick={goBackOneStep}
                    />

                    <div className="">
                        <div className="text-3xl leading-10 font-medium">
                            {question}
                        </div>
                        <div className="font-normal text-gray-600 mt-2">
                            {language === 'Danish'
                                ? 'Indtast dit svar på din telefon'
                                : 'Type your answer on your phone'}
                        </div>
                        <div className="flex flex-col items-center mt-40">
                            <div
                                ref={dotsRef}
                                className="mb-20 flex relative justify-between w-36"
                            >
                                <div className="dot dot-one"></div>
                                <div className="dot dot-two"></div>
                                <div className="dot dot-three"></div>
                                <div className="checkmark draw absolute hidden"></div>
                            </div>
                            <div className="text-lg">{getAnswerText}</div>
                            {!redoAnswer ? null : (
                                <Touchless
                                    onClick={playAnimation}
                                    className={
                                        ' shadow-inactive rounded-xl mt-14 px-4 py-1 text-lg place-items-center border-4 border-transparent'
                                    }
                                >
                                    {language === 'Danish'
                                        ? 'Vil du indtaste et andet svar?'
                                        : 'Do you want to type something else?'}
                                </Touchless>
                            )}
                        </div>
                    </div>
                    <NextButton
                        onClick={() =>
                            answer ? handleChoice(question, answer) : null
                        }
                        currentStep={currentStep}
                    />
                </div>
            )}
        </>
    );
};

export default TextQuestion;
