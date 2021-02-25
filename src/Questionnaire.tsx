import React, { useState } from 'react';
import ButtonQuestion from './QuestionTypes/ButtonQuestion';
import RankedListQuestion from './QuestionTypes/RankedListQuestion';
import SliderQuestion from './QuestionTypes/SliderQuestion';

export interface QuestionnaireProps {}

const Questionnaire: React.SFC<QuestionnaireProps> = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);

    return (
        <div className="h-screen w-2/3 flex justify-center items-center">
            <button onClick={() => setCurrentStep(currentStep + 1)}>Click to advance</button>
            <SliderQuestion
                currentStep={currentStep}
                renderOnStep={1}
                question={'How many people were with you while shopping today?'}
                subText={'Swipe right or left to adjust the slider.'}
                rangeMin={0}
                rangeMax={4}
                intervals={1}
                startValue={2}
            />
            <SliderQuestion
                currentStep={currentStep}
                renderOnStep={2}
                question={'How was your shopping trip today?'}
                subText={'Swipe right or left to adjust the slider.'}
                rangeMin={0}
                rangeMax={100}
                startValue={50}
                minLabel={'😫'}
                maxLabel={'😄'}
            />
            <ButtonQuestion
                currentStep={currentStep}
                renderOnStep={3}
                question={'Are you satisfied with peoples ability to stay socially distanced throughout the store?'}
                firstButtonText={'Yes'}
                secondButtonText={'No'}
            />
            <RankedListQuestion currentStep={currentStep} renderOnStep={4} />
        </div>
    );
};

export default Questionnaire;
