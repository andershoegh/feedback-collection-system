import React, { useState, useEffect } from 'react';
import './RankingQuestion.css';
import Arrows from '../Resources/ArrowsDownUp.png';

export interface RankingQuestionProps {
    currentStep: number;
    renderOnStep: number;
    question: string;
    subText: string;
    items: string[];
}

const RankingQuestion: React.FC<RankingQuestionProps> = (props) => {
    const { currentStep, renderOnStep, question, subText, items } = props;
    const [activatedItem, setActivatedItem] = useState<HTMLDivElement>();
    const [list, setList] = useState<string[]>(items);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            let index = list.findIndex((item) => item === activatedItem!.children[1].innerHTML) || -1;
            let newList = list;

            switch (e.key) {
                case 'w':
                    updateListOrder(newList, index, index - 1);
                    break;
                case 's':
                    updateListOrder(newList, index, index + 1);
                    break;
            }

            console.log(list);
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [activatedItem, list, setList]);

    const activateItem = (item: EventTarget) => {
        let newItem = item as HTMLDivElement;
        activatedItem?.classList.remove('active-item');
        newItem.classList.add('active-item');
        setActivatedItem(newItem);
    };

    const updateListOrder = (list: string[], oldIndex: number, newIndex: number) => {
        if (newIndex < list.length && newIndex >= 0) {
            let newList = list;
            newList.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
            setList(newList);
        }
    };

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
                        <div className="w-full">
                            {list.map((item) => {
                                return (
                                    <div
                                        key={item}
                                        onClick={(e) => activateItem(e.target)}
                                        className="flex border-4 border-transparent p-6 text-3xl rounded-xl my-8 shadow-inactive w-full focus:shadow-focused focus:outline-none focus:border-4 focus:border-blue-500 focus:border-opacity-100"
                                    >
                                        <img src={Arrows} alt="arrows" className="mr-6" />
                                        <span>{item}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <button className="border-4 border-transparent shadow-inactive focus:shadow-focused focus:outline-none focus:border-4 focus:border-blue-500 focus:border-opacity-100 py-6 px-32 text-3xl rounded-xl m-4">
                        Next
                    </button>
                </div>
            )}
        </>
    );
};

export default RankingQuestion;
