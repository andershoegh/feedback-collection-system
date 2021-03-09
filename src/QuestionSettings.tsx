import { createContext, ReactNode, useState } from 'react';

export const maxQuestions = 7;

export interface LanguageContextProviderProps {
    children: ReactNode;
}

export interface LanguageType {
    language: 'Danish' | 'English';
    setLanguage: CallableFunction;
}

export const LanguageContext = createContext<LanguageType>({ language: 'Danish', setLanguage: () => {} });

const LanguageContextProvider = (props: LanguageContextProviderProps) => {
    const [language, setLanguage] = useState<'Danish' | 'English'>('Danish');
    return (
        <LanguageContext.Provider value={{ language, setLanguage } as LanguageType}>{props.children}</LanguageContext.Provider>
    );
};

export default LanguageContextProvider;
