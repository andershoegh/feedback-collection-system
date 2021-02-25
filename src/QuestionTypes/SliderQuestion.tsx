import React, { useRef, useState } from 'react';

export interface SliderQuestionProps {
    currentStep: number;
    renderOnStep: number;
    question: string;
    subText: string;
    rangeMin: number;
    rangeMax: number;
    intervals?: number;
    startValue: number;
    minLabel?: string;
    maxLabel?: string;
}

const SliderQuestion: React.FC<SliderQuestionProps> = (props) => {
    const { currentStep, renderOnStep, question, subText, rangeMin, rangeMax, intervals, startValue, minLabel, maxLabel } = props;
    const labelsRef = useRef<HTMLSpanElement>(null);
    const [selectedValue, setSelectedValue] = useState<number>(startValue);
    const highlightedClasses = ['font-semibold', 'scale-150', 'text-blue-700'];
    let baseStyleClasses = ['inline-block', 'ease-in-out', 'transform', 'transition', 'scale-100'];

    const updateSelected = (value: number) => {
        if (intervals && labelsRef.current) {
            labelsRef.current.children[selectedValue].classList.remove(...highlightedClasses);
            labelsRef.current.children[value].classList.add(...highlightedClasses);
        } else if (labelsRef.current) {
            let scaleFactorMin = ((rangeMax - value) * 1.5) / (rangeMax - rangeMin) + 1;
            let scaleFactorMax = ((value - rangeMin) * 1.5) / (rangeMax - rangeMin) + 1;

            labelsRef.current.children[0].setAttribute('style', `transform: scale(${scaleFactorMin});`);
            labelsRef.current.children[1].setAttribute('style', `transform: scale(${scaleFactorMax});`);
        }
        setSelectedValue(value);
    };

    const setIntervalLabels = () => {
        if (intervals) {
            let label = rangeMin;
            const labels = [];

            while (label <= rangeMax) {
                let labelText = minLabel && label === rangeMin ? minLabel : maxLabel && label === rangeMax ? maxLabel : label;
                let styleClasses =
                    label === selectedValue ? highlightedClasses.concat(baseStyleClasses).join(' ') : baseStyleClasses.join(' ');

                labels.push(<span className={styleClasses}>{labelText}</span>);
                label++;
            }
            return labels;
        } else {
            return [
                <span className={baseStyleClasses.join(' ')}>{minLabel}</span>,
                <span className={baseStyleClasses.join(' ')}>{maxLabel}</span>,
            ];
        }
    };

    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="w-4/5">
                    <div className="text-3xl leading-10 font-medium">{question}</div>
                    <div className="font-normal">{subText}</div>
                    <div className="justify-center mt-40">
                        <input
                            type="range"
                            min={rangeMin}
                            max={rangeMax}
                            value={selectedValue}
                            step={intervals}
                            onChange={(e) => updateSelected(parseInt(e.target.value))}
                            className="block w-full mb-8"
                        />
                        <span ref={labelsRef} className="block flex justify-between font-normal text-lg text-blue-500">
                            {setIntervalLabels()}
                        </span>
                    </div>
                    <button className="border-4 border-transparent shadow-inactive focus:shadow-focused focus:outline-none focus:border-4 focus:border-blue-500 focus:border-opacity-100 py-6 px-32 text-3xl rounded-xl m-4">
                        Next
                    </button>
                </div>
            )}
        </>
    );
};

export default SliderQuestion;
