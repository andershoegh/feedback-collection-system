import React, { useRef, useState } from "react";
import BackButton from "../BackButton";
import NextButton from "../NextButton";
import "./Slider.css";

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
  handleChoice: (question: string, answer: string) => void;
  goBackOneStep: () => void;
}

const SliderQuestion: React.FC<SliderQuestionProps> = (props) => {
  const {
    currentStep,
    renderOnStep,
    question,
    subText,
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
  const highlightedClasses = ["font-semibold", "scale-150", "text-blue-600"];
  let baseStyleClasses = [
    "inline-block",
    "ease-in-out",
    "transform",
    "transition",
    "scale-100",
  ];

  const updateSelected = (value: number) => {
    if (intervals && labelsRef.current) {
      labelsRef.current.children[selectedValue].classList.remove(
        ...highlightedClasses
      );
      labelsRef.current.children[value].classList.add(...highlightedClasses);
    } else if (labelsRef.current) {
      let scaleFactorMin = (rangeMax - value) / (rangeMax - rangeMin) + 1;
      let scaleFactorMax = (value - rangeMin) / (rangeMax - rangeMin) + 1;

      labelsRef.current.children[0].setAttribute(
        "style",
        `transform: scale(${scaleFactorMin});`
      );
      labelsRef.current.children[1].setAttribute(
        "style",
        `transform: scale(${scaleFactorMax});`
      );
    }
    setSelectedValue(value);
  };

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
            ? highlightedClasses.concat(baseStyleClasses).join(" ")
            : baseStyleClasses.join(" ");

        labels.push(<span className={styleClasses}>{labelText}</span>);
        currentLabel++;
      }
      return labels;
    } else {
      return [
        <span className={baseStyleClasses.join(" ")}>{minLabel}</span>,
        <span className={baseStyleClasses.join(" ")}>{maxLabel}</span>,
      ];
    }
  };

  return (
    <>
      {currentStep !== renderOnStep ? null : (
        <div className="w-4/5 h-screen relative">
          <div>
            <BackButton
              currentStep={currentStep}
              onClick={() => goBackOneStep()}
            />
            <div className="absolute top-32 w-full">
              <div className="text-3xl leading-10 font-medium">{question}</div>
              <div className="font-normal text-gray-600 mt-2">{subText}</div>
              <div className="justify-center mt-40">
                <input
                  type="range"
                  min={rangeMin}
                  max={rangeMax}
                  value={selectedValue}
                  step={intervals}
                  onChange={(e) => updateSelected(parseInt(e.target.value))}
                  className="slider block w-full mb-8"
                />
                <span
                  ref={labelsRef}
                  className="flex justify-between font-normal text-lg text-blue-500 mx-2"
                >
                  {setIntervalLabels()}
                </span>
              </div>
            </div>

            <NextButton
              onClick={() => handleChoice(question, selectedValue.toString())}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SliderQuestion;
