import React, { useContext } from 'react';
import { Touchless } from 'touchless-navigation';
import { animateClick, LanguageContext } from './QuestionSettings';
import DKFlag from './Resources/DKFlag';
import GBFlag from './Resources/GBFlag';

export interface SwitchLanguageButtonProps {
    renderOnStep: number;
}

const SwitchLanguageButton: React.SFC<SwitchLanguageButtonProps> = ({
    renderOnStep,
}) => {
    const { language, setLanguage } = useContext(LanguageContext);
    return (
        <>
            {renderOnStep === 1 ? (
                <Touchless
                    className={`shadow-inactive text-2xl rounded-xl px-20 py-8 absolute top-10 left-10 border-4 border-transparent`}
                    onClick={(e) => {
                        animateClick(e);
                        setLanguage(
                            language === 'Danish' ? 'English' : 'Danish'
                        );
                    }}
                >
                    {language === 'Danish' ? (
                        <div className="flex place-items-center">
                            <div className="h-12 w-12 place-items-center flex mr-6">
                                <GBFlag />
                            </div>
                            <span>Switch to English</span>
                        </div>
                    ) : (
                        <div className="flex place-items-center">
                            <div className="h-5 w-5 place-items-center flex mr-2">
                                <DKFlag />
                            </div>
                            <span>Skift til dansk</span>
                        </div>
                    )}
                </Touchless>
            ) : null}
        </>
    );
};

export default SwitchLanguageButton;
