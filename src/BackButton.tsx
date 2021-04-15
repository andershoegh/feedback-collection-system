import { ArrowBendUpLeft } from 'phosphor-react';
import React, { useContext } from 'react';
import { Touchless } from 'touchless-navigation';
import { LanguageContext } from './QuestionSettings';

export interface BackButtonProps {
    onClick: () => void;
    currentStep: number;
}

const BackButton: React.SFC<BackButtonProps> = ({ onClick, currentStep }) => {
    const { language } = useContext(LanguageContext);
    return (
        <div className="absolute top-10 left-0">
            {currentStep !== 1 ? (
                <Touchless
                    onClick={onClick}
                    className={`shadow-inactive text-3xl rounded-xl px-20 py-8 flex place-items-center border-4 border-transparent`}
                >
                    <ArrowBendUpLeft className="mr-6 text-4xl" />{' '}
                    {language === 'Danish' ? 'Tilbage' : 'Back'}
                </Touchless>
            ) : null}
        </div>
    );
};

export default BackButton;
