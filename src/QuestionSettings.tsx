import { createContext, ReactNode, useState } from 'react';

export const maxQuestions = 7;

export interface LanguageContextProviderProps {
    children: ReactNode;
}

export interface LanguageType {
    language: 'Danish' | 'English';
    setLanguage: CallableFunction;
}

export const LanguageContext = createContext<LanguageType>({
    language: 'Danish',
    setLanguage: () => {},
});

const LanguageContextProvider = (props: LanguageContextProviderProps) => {
    const [language, setLanguage] = useState<'Danish' | 'English'>('Danish');
    return (
        <LanguageContext.Provider
            value={{ language, setLanguage } as LanguageType}
        >
            {props.children}
        </LanguageContext.Provider>
    );
};

export const animateClick = (
    e: React.MouseEvent<HTMLDivElement | MouseEvent, MouseEvent>
) => {
    const target = e.target as HTMLDivElement;
    target.animate(
        {
            // keyframes
            transform: ['scale(1)', 'scale(.9)', 'scale(1)'],
            offset: [0, 0.5, 1],
        },
        {
            // timing options
            duration: 180,
            iterations: 1,
        }
    );
};

export const buttonStyle =
    'shadow-inactive focus:shadow-focused focus:border-blue-500 border-4 border-transparent focus:outline-none rounded-xl active:scale-90 animate transition transform';

export default LanguageContextProvider;
