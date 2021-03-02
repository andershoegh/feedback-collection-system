import { ArrowBendUpLeft } from 'phosphor-react';
import React from 'react';

export interface BackButtonProps {
    onClick: () => void;
    currentStep: number;
}

const BackButton: React.SFC<BackButtonProps> = ({ onClick, currentStep }) => {
    return (
        <>
            {currentStep !== 0 ? (
                <button onClick={onClick} className={`${buttonStyle} flex px-4 py-1 text-lg place-items-center`}>
                    <ArrowBendUpLeft className="mr-3 text-xl" /> Back
                </button>
            ) : null}
        </>
    );
};

export default BackButton;

const buttonStyle =
    'shadow-inactive focus:shadow-focused focus:border-blue-500 border-4 border-transparent focus:outline-none rounded-xl active:scale-90 animate transition transform';
