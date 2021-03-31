import React, { useContext, useMemo } from 'react';
// import hand from './Resources/hand.png';
import handFill from './Resources/handFill.png';
// import handSwipe from './Resources/handSwipe.png';
// import handTap from './Resources/handTap.png';
import './Guide.css';
import { LanguageContext } from './QuestionSettings';

export interface GuideProps {
    interactionSelected: string;
}

const Guide: React.SFC<GuideProps> = (props) => {
    const { interactionSelected } = props;
    const { language } = useContext(LanguageContext);

    const setTutorialElements = useMemo(() => {
        if (interactionSelected === 'none') {
        } else if (interactionSelected === 'mobile') {
            return (
                <>
                    {/* MOBILE SWIPE  */}
                    <div className="flex items-center mb-36 ml-14">
                        <div className="flex items-end relative h-72 w-36 mr-20">
                            <div className="phone"></div>
                            <img
                                src={handFill}
                                className="hand"
                                alt="mobile swipe tutorial"
                                id="mobile-swipe"
                            />
                        </div>
                        <p>
                            {language === 'English'
                                ? 'Swipe to navigate'
                                : 'Swipe for at navigere'}
                        </p>
                    </div>
                    {/* MOBILE TAP  */}
                    <div className="flex ml-14 items-center">
                        <div className="flex items-end relative h-72 w-36 mr-20">
                            <div className="phone"></div>
                            <img
                                src={handFill}
                                className="hand"
                                alt="mobile tap tutorial"
                                id="mobile-tap"
                            />
                        </div>
                        <p>
                            {language === 'English'
                                ? 'Tap to select'
                                : 'Tap for at vælge'}
                        </p>
                    </div>
                </>
            );
        } else if (interactionSelected === 'gesture') {
            return (
                <>
                    {/* GESTURE SWIPE  */}
                    <div className="flex flex-col items-center mb-36">
                        <div className="flex justify-end items-center relative h-64 w-3/5">
                            <div className="display">
                                <div className="gesture-cursor navigation-cursor w-8 h-8 border-blue-500 border-4"></div>
                            </div>
                            <img
                                src={handFill}
                                className="w-2/5 pt-11 hand"
                                alt="gesture navigate tutorial"
                                id="gesture-swipe"
                            />
                        </div>
                        <p>
                            {language === 'English'
                                ? 'Move your hand to navigate'
                                : 'Flyt din hånd for at navigere'}
                        </p>
                    </div>
                    {/* GESTURE TAP  */}
                    <div className="flex flex-col items-center">
                        <div className="flex justify-end items-center relative h-64 w-3/5">
                            <div className="display">
                                <div className="gesture-cursor tap-cursor w-8 h-8 border-blue-500 border-4"></div>
                            </div>
                            <img
                                src={handFill}
                                className="w-2/5 pt-11 hand"
                                alt="gesture tap tutorial"
                                id="gesture-tap"
                            />
                        </div>
                        <p>
                            {language === 'English'
                                ? 'Tap to select'
                                : 'Tap for at vælge'}
                        </p>
                    </div>
                </>
            );
        }
    }, [interactionSelected, language]);

    return (
        <div className="bg-gray-800 w-2/4 h-screen flex flex-col justify-center text-base font-bold text-blue-500">
            {setTutorialElements}
        </div>
    );
};

export default Guide;
