import React, { useState, useEffect, useRef, useContext } from 'react';
import './RankingQuestion.css';
import Arrows from '../Resources/ArrowsDownUp.png';
import BackButton from '../BackButton';
import NextButton from '../NextButton';
import { Touchless } from 'touchless-navigation';
import { LanguageContext } from '../QuestionSettings';

export interface RankingQuestionProps {
    currentStep: number;
    renderOnStep: number;
    question: string;
    answersArray: string[];
    handleChoice: (
        question: string,
        answer: string | number | string[]
    ) => void;
    goBackOneStep: () => void;
}

const RankingQuestion: React.FC<RankingQuestionProps> = (props) => {
    const {
        currentStep,
        renderOnStep,
        question,
        answersArray,
        handleChoice,
        goBackOneStep,
    } = props;
    const [list, setList] = useState<string[]>(answersArray);
    const listRef = useRef<HTMLDivElement>(null);
    const [activeItem, setActiveItem] = useState<HTMLDivElement | null>();
    const [isOnThisPage, setIsOnThisPage] = useState(false);
    const { language } = useContext(LanguageContext);
    const animationDuration = 700;

    const updateListOrder = (currentItemIndex: number) => {
        let activeItemIndex = list.findIndex(
            (item) => item.trim() === activeItem?.innerText.trim()
        );

        if (currentItemIndex < list.length && currentItemIndex >= 0) {
            // Saves the previous list order from listRef and item height plus margin
            const oldListElement = Array.from(listRef.current!.children);
            const margin = parseInt(
                window
                    .getComputedStyle(listRef.current?.children[0]!)
                    .marginBottom.slice(0, -2)
            );
            const itemHeight =
                listRef.current!.children[0].getBoundingClientRect().height +
                margin;

            // Swaps the position of the active item and the current item
            let oldActiveIndex = list[activeItemIndex];

            list[activeItemIndex] = list[currentItemIndex];
            list[currentItemIndex] = oldActiveIndex;

            // Loops through to animate position change
            oldListElement.forEach((c, prevIndex) => {
                if (
                    prevIndex === activeItemIndex ||
                    prevIndex === currentItemIndex
                ) {
                    const item = c as HTMLDivElement;

                    // Calculates the offset to be applied for the animation
                    const moveCurrentUp = activeItemIndex < currentItemIndex;
                    const offsetDir = moveCurrentUp
                        ? prevIndex === activeItemIndex
                            ? -1
                            : 1
                        : prevIndex === activeItemIndex
                        ? 1
                        : -1;
                    const indexDiff = Math.abs(
                        activeItemIndex - currentItemIndex
                    );
                    const yOffset = itemHeight * indexDiff * offsetDir;

                    // Clears the wiggle animation on the active item for smooth move animation
                    if (prevIndex === activeItemIndex) {
                        item.style.animation = '';
                    }

                    // Places the item in its previous position before the browser draws the update
                    requestAnimationFrame(() => {
                        item.style.transform = `translate(0,${yOffset}px)`;
                        item.style.transition = 'transform 0s';

                        // Then changes transform & transition to move the item to its new position
                        requestAnimationFrame(() => {
                            item.style.transform = '';
                            item.style.transition = `transform ${animationDuration}ms`;
                        });
                    });
                }
            });

            setActiveItem(null);
        }
    };

    const handleItemClick = (target: HTMLDivElement, index: number) => {
        if (!activeItem) {
            target.style.animation = 'wiggle 2s infinite';
            setActiveItem(target);
        } else if (activeItem !== target) {
            updateListOrder(index);
        } else {
            target.style.animation = '';
            setActiveItem(null);
        }
    };

    // Clears activeItem if navigating to another page
    useEffect(() => {
        if (currentStep === renderOnStep) {
            setIsOnThisPage(true);
        }
        if (isOnThisPage && currentStep !== renderOnStep) {
            setActiveItem(null);
            setIsOnThisPage(false);
        }
    }, [currentStep, renderOnStep]);

    // Sets list based on selected language
    useEffect(() => {
        setList(answersArray);
        // eslint-disable-next-line
    }, [language]);

    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="w-4/5 h-screen relative flex items-center justify-center">
                    <div>
                        <BackButton
                            currentStep={currentStep}
                            onClick={() =>
                                setTimeout(() => {
                                    goBackOneStep();
                                }, 200)
                            }
                        />
                        <div className="">
                            <div className="text-5xl leading-10 font-medium">
                                {question}
                            </div>
                            <div className="font-normal text-gray-600 text-2xl mt-6 mb-20">
                                {language.trim() === 'Danish'.trim()
                                    ? 'Arrangér svarene i rækkefølge hvor 1 er vigtigst'
                                    : 'Arrange the answers in order where 1 is the most important'}
                            </div>
                            <div className="font-bold text-xl text-gray-600 mt-4">
                                {language.trim() === 'Danish'.trim()
                                    ? 'Tryk for at justere rækkefølge. Tryk igen for at navigere videre.'
                                    : 'Tap to adjust order. Tap again to navigate again.'}
                            </div>
                            <div className="flex row-auto text-2xl font-normal mt-4 w-full">
                                <div className="flex flex-col text-xl justify-between mr-6 py-5">
                                    {list.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="mb-5 text-blue-500"
                                            >
                                                {index + 1}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div ref={listRef} className="w-full">
                                    {list.map((item, index) => {
                                        return (
                                            <Touchless
                                                key={item}
                                                startElement={0 === index}
                                                className={
                                                    'shadow-inactive rounded-xl text-2xl flex items-center bg-white p-4 py-3 mb-5 w-full border-4 border-transparent'
                                                }
                                                onClick={(e) => {
                                                    const target = e.target as HTMLDivElement;
                                                    handleItemClick(
                                                        target,
                                                        index
                                                    );
                                                }}
                                            >
                                                <img
                                                    src={Arrows}
                                                    alt="arrows"
                                                    className="mr-4"
                                                />
                                                <span>{item}</span>
                                            </Touchless>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <NextButton
                            currentStep={currentStep}
                            onClick={() =>
                                setTimeout(
                                    () => handleChoice(question, list),
                                    200
                                )
                            }
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default RankingQuestion;
