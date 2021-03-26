import React, {
    useRef,
    useState,
    useContext,
    useEffect,
    useCallback,
    useMemo,
} from 'react';
import { Touchless, useCustomKeys } from 'touchless-navigation';
import BackButton from '../BackButton';
import NextButton from '../NextButton';
import { LanguageContext } from '../QuestionSettings';
import './Slider.css';

export interface SliderQuestionProps {
    currentStep: number;
    renderOnStep: number;
    question: string;
    rangeMin: number;
    rangeMax: number;
    intervals?: number;
    startValue: number;
    minLabel?: string;
    maxLabel?: string;
    handleChoice: (question: string, answer: string) => void;
    goBackOneStep: () => void;
}

const SliderQuestion: React.FC<SliderQuestionProps> = (props) => {
    const {
        currentStep,
        renderOnStep,
        question,
        rangeMin,
        rangeMax,
        intervals,
        startValue,
        minLabel,
        maxLabel,
        handleChoice,
        goBackOneStep,
    } = props;
    const labelsRef = useRef<HTMLSpanElement>(null);
    const [selectedValue, setSelectedValue] = useState<number>(startValue);
    const [usingCustomKeys, setUsingCustomKeys] = useState<boolean>(false);
    const [thumbColorAnimation, setThumbColorAnimation] = useState<number>();
    const highlightedClasses = useMemo(
        () => ['font-semibold', 'scale-150', 'text-blue-600'],
        []
    );
    const { language } = useContext(LanguageContext);
    const sliderRef = useRef<HTMLInputElement>(null);
    const { clear, initiate } = useCustomKeys({
        swipeLeft: 'a',
        swipeRight: 'd',
        swipeDown: 's',
        swipeUp: 'w',
    });
    let baseStyleClasses = [
        'inline-block',
        'ease-in-out',
        'transform',
        'transition',
        'scale-100',
    ];

    const updateSelected = useCallback(
        (value: number) => {
            if (intervals && labelsRef.current) {
                // styles interval numbers if they are passed through props
                labelsRef.current.children[selectedValue].classList.remove(
                    ...highlightedClasses
                );
                labelsRef.current.children[value].classList.add(
                    ...highlightedClasses
                );
            } else if (labelsRef.current) {
                // else styles min and max label sizes based on current value
                let scaleFactorMin =
                    (rangeMax - value) / (rangeMax - rangeMin) + 1;
                let scaleFactorMax =
                    (value - rangeMin) / (rangeMax - rangeMin) + 1;

                labelsRef.current.children[0].setAttribute(
                    'style',
                    `transform: scale(${scaleFactorMin});`
                );
                labelsRef.current.children[1].setAttribute(
                    'style',
                    `transform: scale(${scaleFactorMax});`
                );
            }
        },
        [highlightedClasses, intervals, rangeMax, rangeMin, selectedValue]
    );

    const setIntervalLabels = () => {
        if (intervals) {
            let currentLabel = rangeMin;
            const labels = [];

            while (currentLabel <= rangeMax) {
                let labelText =
                    minLabel && currentLabel === rangeMin
                        ? minLabel
                        : maxLabel && currentLabel === rangeMax
                        ? maxLabel
                        : currentLabel;
                let styleClasses =
                    currentLabel === selectedValue
                        ? highlightedClasses.concat(baseStyleClasses).join(' ')
                        : baseStyleClasses.join(' ');

                labels.push(
                    <span key={labelText} className={styleClasses}>
                        {labelText}
                    </span>
                );
                currentLabel++;
            }
            return labels;
        } else {
            return [
                <span key={minLabel} className={baseStyleClasses.join(' ')}>
                    {minLabel}
                </span>,
                <span key={maxLabel} className={baseStyleClasses.join(' ')}>
                    {maxLabel}
                </span>,
            ];
        }
    };

    // handles animation of thumb while selected
    const handleTouchlessClick = (runAnimation: boolean) => {
        if (runAnimation) {
            let i = 0;
            setThumbColorAnimation(
                window.setInterval(() => {
                    if (i % 4 === 0) {
                        document.documentElement.style.setProperty(
                            '--thumb-color',
                            'rgb(71, 126, 247)'
                        );
                    } else if (i % 4 === 1) {
                        document.documentElement.style.setProperty(
                            '--thumb-color',
                            'rgb(37, 99, 235)'
                        );
                    }
                    i++;
                }, 400)
            );
        } else {
            clearInterval(thumbColorAnimation);
        }
    };

    // handles input for changing slider value
    useEffect(() => {
        if (usingCustomKeys) {
            const handleSliderKeys = (event: KeyboardEvent) => {
                switch (event.key) {
                    case 'a':
                        setSelectedValue((oldValue) => oldValue - 10);
                        updateSelected(selectedValue - 2.5);
                        break;
                    case 'd':
                        setSelectedValue((oldValue) => oldValue + 10);
                        updateSelected(selectedValue + 2.5);
                        break;
                    default:
                        break;
                }
            };
            document.addEventListener('keydown', handleSliderKeys);
            return () => {
                document.removeEventListener('keydown', handleSliderKeys);
                // STOPPED USING CUSTOM KEYS
            };
        }
    }, [usingCustomKeys, selectedValue, updateSelected]);

    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="w-4/5 h-screen relative flex items-center justify-center">
                    <div className="w-full">
                        <BackButton
                            currentStep={currentStep}
                            onClick={() => goBackOneStep()}
                        />
                        <div className="w-full">
                            <div className="text-3xl leading-10 font-medium">
                                {question}
                            </div>
                            <div className="font-normal text-gray-600 mt-2">
                                {language === 'Danish'
                                    ? 'Swipe til det ønskede svar'
                                    : 'Swipe to your desired answer'}
                            </div>
                            <div className="justify-center mt-40">
                                <div className="justify-center flex text-2xl mb-8 font-medium text-gray-800">
                                    {!usingCustomKeys
                                        ? language === 'Danish'
                                            ? 'Tryk på slider for at justere'
                                            : 'Tap the slider to choose'
                                        : language === 'English'
                                        ? 'Slide to the left and the right - tap when you have chosen'
                                        : 'Træk til højre og venstre - tryk for at afslutte justering'}
                                </div>
                                <div className={`${usingCustomKeys ? '' : ''}`}>
                                    <Touchless
                                        startElement={true}
                                        onClick={() => {
                                            if (!usingCustomKeys) {
                                                initiate();

                                                if (sliderRef.current) {
                                                    sliderRef.current.classList.remove(
                                                        'slider'
                                                    );
                                                    sliderRef.current.classList.add(
                                                        'slider-active'
                                                    );
                                                }
                                                handleTouchlessClick(true);
                                            } else {
                                                clear();
                                                if (sliderRef.current) {
                                                    sliderRef.current.classList.remove(
                                                        'slider-active'
                                                    );
                                                    sliderRef.current.classList.add(
                                                        'slider'
                                                    );
                                                }
                                                handleTouchlessClick(false);
                                            }
                                            setUsingCustomKeys(
                                                (prevValue) => !prevValue
                                            );
                                        }}
                                        className={`shadow-inactive rounded-xl border-4 border-transparent py-4 px-2 ${
                                            usingCustomKeys ? '' : ''
                                        }`}
                                    >
                                        <input
                                            id="slider"
                                            type="range"
                                            ref={sliderRef}
                                            min={rangeMin}
                                            max={rangeMax}
                                            value={selectedValue}
                                            step={intervals}
                                            onChange={(e) =>
                                                updateSelected(
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            className={`shadow-inactive overflow-hidden h-5 outline-none block w-full slider ${
                                                usingCustomKeys ? '' : ''
                                            }`}
                                        />
                                    </Touchless>
                                </div>
                                <span
                                    ref={labelsRef}
                                    className="flex justify-between font-normal text-4xl mt-6 px-6 text-blue-500 mx-2"
                                >
                                    {setIntervalLabels()}
                                </span>
                                {language === 'Danish' ? (
                                    <div className="flex  justify-between mt-3 font-medium text-gray-700">
                                        <span>Meget utilfreds</span>
                                        <span>Meget tilfreds</span>
                                    </div>
                                ) : (
                                    <div className="flex  justify-between mt-3 font-medium text-gray-700">
                                        <span>Very unsatisfied</span>
                                        <span>Very satisfied</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <NextButton
                            currentStep={currentStep}
                            onClick={() =>
                                setTimeout(() => {
                                    handleChoice(
                                        question,
                                        selectedValue.toString()
                                    );
                                }, 200)
                            }
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default SliderQuestion;
