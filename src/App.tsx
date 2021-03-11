import './App.css'
import Guide from './Guide'
import Questionnaire from './Questionnaire'
import { TouchlessApp } from 'touchless-navigation'
import LanguageContextProvider from './QuestionSettings'

function App() {
    return (
        <TouchlessApp secondaryThreshold={50}>
            <LanguageContextProvider>
                <div className="flex font-body">
                    <Guide />
                    <Questionnaire />
                </div>
            </LanguageContextProvider>
        </TouchlessApp>
    )
}

export default App
