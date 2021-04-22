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
        } else if (interactionSelected.substr(0,5) === 'phone') {
            return (
                <>
                    {/* MOBILE SWIPE  */}
                    <div className="flex items-center justify-center mb-36 ml-14">
                        <div
                            style={{ height: '500px', width: '220px' }}
                            className="flex items-end relative mr-20"
                        >
                            <div className="phone"></div>
                            <img
                                src={handFill}
                                className="hand mb-40 ml-5"
                                alt="mobile swipe tutorial"
                                id="mobile-swipe"
                            />
                        </div>
                        <p className="text-2xl">
                            {language === 'English'
                                ? 'Swipe to navigate'
                                : 'Swipe for at navigere'}
                        </p>
                    </div>
                    {/* MOBILE TAP  */}
                    <div className="flex  items-center justify-center">
                        <div
                            style={{ height: '500px', width: '220px' }}
                            className="flex items-end relative mr-20"
                        >
                            <div className="phone"></div>
                            <img
                                src={handFill}
                                className="hand mb-40 ml-4"
                                alt="mobile tap tutorial"
                                id="mobile-tap"
                            />
                        </div>
                        <p className="text-2xl">
                            {language === 'English'
                                ? 'Tap to select'
                                : 'Tap for at vælge'}
                        </p>
                    </div>
                </>
            );
        } else if (interactionSelected.substr(0,10) === 'leapMotion') {
            return (
                <>
                    {/* GESTURE SWIPE  */}
                    <div className="flex flex-col items-center mb-60">
                        <div className="flex justify-end items-center relative h-64 w-3/5">
                            <div className="display">
                                <div className="gesture-cursor navigation-cursor w-12 h-12 border-blue-500 border-4"></div>
                            </div>
                            <img
                                src={handFill}
                                className="w-2/5 pt-11 hand"
                                alt="gesture navigate tutorial"
                                id="gesture-swipe"
                            />
                        </div>
                        <p className="mt-28 text-2xl">
                            {language === 'English'
                                ? 'Move your hand to navigate'
                                : 'Bevæg din hånd for at navigere'}
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
                        <p className="mt-28 text-2xl">
                            {language === 'English'
                                ? 'Tap forwards in the air to select'
                                : 'Tryk frem i luften for at vælge'}
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
