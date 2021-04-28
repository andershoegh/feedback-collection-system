import { ArrowRight } from 'phosphor-react';
import React, { useContext } from 'react';
import { Touchless } from 'touchless-navigation';
import {
    LanguageContext,
    maxQuestions,
    buttonStyle,
    animateClick,
} from './QuestionSettings';

export interface NextButtonProps {
    onClick: () => void;
    currentStep: number;
}

const NextButton: React.SFC<NextButtonProps> = ({ onClick, currentStep }) => {
    const { language } = useContext(LanguageContext);
    return (
        <div className="absolute bottom-16 ">
            <Touchless
                onClick={(e) => {
                    animateClick(e);
                    setTimeout(() => onClick(), 200);
                }}
                className={`${buttonStyle} shadow-inactive text-3xl rounded-xl px-20 py-8 flex place-items-center border-4 border-transparent `}
            >
                {maxQuestions === currentStep
                    ? language === 'Danish'
                        ? 'Afslut'
                        : 'Finish'
                    : language === 'Danish'
                    ? 'Næste'
                    : 'Next'}

                <ArrowRight className="ml-6 text-4xl" />
            </Touchless>
        </div>
    );
};

export default NextButton;
