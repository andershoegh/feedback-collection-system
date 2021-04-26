import React, { useState } from 'react';
import './App.css';
import Guide from './Guide';
import Questionnaire from './Questionnaire';
import { TouchlessApp } from 'touchless-navigation';
import LanguageContextProvider from './QuestionSettings';
const interactionTypes: readonly (
    | 'phoneHighlight'
    | 'phoneCursor'
    | 'leapMotion'
    | 'leapMotionPinch'
)[] = Object.freeze([
    'phoneHighlight',
    'phoneCursor',
    'leapMotion',
    'leapMotionPinch',
]);
const containsQRCode = new Set(['phoneHighlight', 'phoneCursor']);

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
        <TouchlessApp secondaryThreshold={50} interactionType={interactionType}>
            <LanguageContextProvider>
                <div className="flex font-body">
                    <button onClick={nextInteractionType}>TEST ME</button>
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
