import React, { useState } from 'react';
import './App.css';
import Guide from './Guide';
import Questionnaire from './Questionnaire';
import { TouchlessApp } from 'touchless-navigation';
import LanguageContextProvider from './QuestionSettings';

const App: React.FC = () => {
    // Set this based on chosen interaction type to display the correct sidebar tutorial
    const [interactionSelected, setInteractionSelected] = useState<
        'gesture' | 'mobile' | 'none'
    >('gesture');

    return (
        <TouchlessApp secondaryThreshold={50}>
            <LanguageContextProvider>
                <div className="flex font-body">
                    <Guide interactionSelected={interactionSelected} />
                    <Questionnaire
                        setInteractionSelected={setInteractionSelected}
                    />
                </div>
            </LanguageContextProvider>
        </TouchlessApp>
    );
};

export default App;
