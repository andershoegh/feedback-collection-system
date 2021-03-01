import React, { useState, useEffect, useRef, useCallback } from 'react';
import './RankingQuestion.css';
import Arrows from '../Resources/ArrowsDownUp.png';

export interface RankingQuestionProps {
    currentStep: number;
    renderOnStep: number;
    question: string;
    subText: string;
    items: string[];
    handleChoice: (question: string, answer: string | number | string[]) => void;
}

const RankingQuestion: React.FC<RankingQuestionProps> = (props) => {
    const { currentStep, renderOnStep, question, subText, items, handleChoice } = props;
    const [activeItem, setActiveItem] = useState<HTMLDivElement>();
    const [list, setList] = useState<string[]>(items);
    const listRef = useRef<HTMLDivElement>(null);

    const activateItem = useCallback(
        (item: HTMLDivElement) => {
            let newItem = item;
            activeItem?.classList.remove('active-item');
            newItem.classList.add('active-item');
            setActiveItem(newItem);
        },
        [activeItem?.classList]
    );

    useEffect(() => {
        const updateListOrder = (oldList: string[], oldIndex: number, newIndex: number) => {
            // Stores info on list items' position before updating the list and re-rendering
            const prevListArr = Array.from(listRef.current!.children);
            const prevListClientRect = [{ content: '', pos: {} }];
            prevListArr.forEach((c) => prevListClientRect.push({ content: c.innerHTML, pos: c.getBoundingClientRect() }));

            if (newIndex < oldList.length && newIndex >= 0) {
                const animationDuration = 600;
                const newList = oldList;

                // Move the active item up or down one position and update the list
                newList.splice(newIndex, 0, oldList.splice(oldIndex, 1)[0]);
                setList([]);
                setList(newList);

                // Gets updated list array from listRef after setting a new list order an loops through to animate position change
                const updatedListArr = Array.from(listRef.current!.children);
                updatedListArr.forEach((c, i) => {
                    const item = c as HTMLDivElement;
                    const newPos = item.getBoundingClientRect();
                    const prevPos = prevListClientRect.find((child) => child.content === c.innerHTML)?.pos as DOMRect;

                    // Calculates the difference from old to new position on render and animates if it moved
                    const deltaY = prevPos.top - newPos.top;

                    if (Math.abs(deltaY) > 10) {
                        requestAnimationFrame(() => {
                            item.style.transition = 'transform 0s';
                            item.style.transform = `translate(0, ${deltaY}px)`;

                            requestAnimationFrame(() => {
                                item.style.transition = `transform ${animationDuration}ms`;
                                item.style.transform = '';
                            });
                        });
                    }
                });

                // Waits for re-render position change animation to finish and sets the new item position as the active item
                const newItem = updatedListArr.find((item) => (item as HTMLDivElement).innerText === activeItem?.innerText);
                setTimeout(() => {
                    activateItem(newItem as HTMLDivElement);
                }, animationDuration);
            }
        };

        const handleKeyPress = (e: KeyboardEvent) => {
            let activeItemIndex = list.findIndex((item) => item === activeItem!.innerText);

            switch (e.key) {
                case 'w':
                    updateListOrder(list, activeItemIndex, activeItemIndex - 1);
                    break;
                case 's':
                    updateListOrder(list, activeItemIndex, activeItemIndex + 1);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [activeItem, list, setList, activateItem]);

    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="w-4/5">
                    <div className="text-3xl leading-10 font-medium">{question}</div>
                    <div className="font-normal">{subText}</div>
                    <div className="flex row-auto mt-12 w-full">
                        <div className="flex flex-col justify-between my-16 mr-6">
                            {list.map((item, index) => {
                                return (
                                    <div key={index} className="font-medium text-2xl text-blue-500">
                                        {index + 1}
                                    </div>
                                );
                            })}
                        </div>
                        <div ref={listRef} className="w-full">
                            {list.map((item) => {
                                return (
                                    <div
                                        key={item}
                                        onClick={(e) => activateItem(e.target as HTMLDivElement)}
                                        className="flex bg-white border-4 border-transparent p-6 text-3xl rounded-xl my-8 shadow-inactive w-full focus:shadow-focused focus:outline-none focus:border-4 focus:border-blue-500 focus:border-opacity-100"
                                    >
                                        <img src={Arrows} alt="arrows" className="mr-6" />
                                        <span>{item}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            setTimeout(() => {
                                handleChoice(question, list);
                            }, 200);
                        }}
                        className="border-4 border-transparent shadow-inactive focus:shadow-focused focus:outline-none focus:border-4 focus:border-blue-500 focus:border-opacity-100 py-6 px-32 text-3xl rounded-xl m-4"
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
};

export default RankingQuestion;
