import React, { useState } from 'react';
import './App.css';
import Guide from './Guide';
import Questionnaire from './Questionnaire';
import { TouchlessApp } from 'touchless-navigation';
import LanguageContextProvider from './QuestionSettings';
export type InteractionType =
    | 'phoneHighlight'
    | 'phoneCursor'
    | 'leapMotion'
    | 'leapMotionPinch';
export const interactionTypes: readonly InteractionType[] = Object.freeze([
    'phoneCursor',
    'leapMotion',
    'phoneHighlight',
]);

const containsQRCode = new Set(['phoneHighlight', 'phoneCursor']);
export const hasCursor = new Set([
    'leapMotion',
    'phoneCursor',
    'leapMotionPinch',
]);

const App = () => {
    const [interactionTypeIndex, setInteractionTypeIndex] = useState(0);
    const nextInteractionType = () => {
        const maxIndex = interactionTypes.length - 1;
        const i =
            interactionTypeIndex >= maxIndex ? 0 : interactionTypeIndex + 1;
        setInteractionTypeIndex(i);
    };
    const interactionType = interactionTypes[interactionTypeIndex];
    const showQR = containsQRCode.has(interactionType);

    return (
        <TouchlessApp
            secondaryThreshold={50}
            topOffset={1350}
            clickLength={50}
            pinchOrGrab={'pinch'}
            strengthBeforeClickReset={0.7}
            strengthToClick={0.9}
            interactionType={interactionType}
            disableLock={true}
        >
            <LanguageContextProvider>
                <div className="flex font-body">
                    {/* <button onClick={nextInteractionType}>TEST ME</button> */}
                    <Guide interactionSelected={interactionType} />
                    <Questionnaire
                        showQR={showQR}
                        interactionType={interactionType}
                        nextInteractionType={nextInteractionType}
                    />
                </div>
            </LanguageContextProvider>
        </TouchlessApp>
    );
};

export default App;
