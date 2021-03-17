import React, { useState, useEffect, useRef, useContext } from 'react'
import './RankingQuestion.css'
import Arrows from '../Resources/ArrowsDownUp.png'
import BackButton from '../BackButton'
import NextButton from '../NextButton'
import { Touchless, useCustomKeys } from 'touchless-navigation'
import { LanguageContext } from '../QuestionSettings'

export interface RankingQuestionProps {
    currentStep: number
    renderOnStep: number
    question: string
    answersArray: string[]
    handleChoice: (question: string, answer: string | number | string[]) => void
    goBackOneStep: () => void
}

const RankingQuestion: React.FC<RankingQuestionProps> = (props) => {
    const {
        currentStep,
        renderOnStep,
        question,
        answersArray,
        handleChoice,
        goBackOneStep,
    } = props
    const [list, setList] = useState<string[]>(answersArray)
    const listRef = useRef<HTMLDivElement>(null)
    const [activeItem, setActiveItem] = useState<HTMLDivElement | null>()
    const [startElement, setStartElement] = useState<number>(0)
    const { language } = useContext(LanguageContext)
    const [animatingPosition, setAnimatingPosition] = useState(false)
    const animationDuration = 400

    const customKeys = useCustomKeys({
        swipeUp: 'w',
        swipeDown: 's',
        swipeLeft: '',
        swipeRight: '',
    })

    useEffect(() => {
        const updateListOrder = (
            oldList: string[],
            oldIndex: number,
            newIndex: number
        ) => {
            if (newIndex < oldList.length && newIndex >= 0) {
                // Saves the previous list order from listRef, item height plus margin, and animation duration in ms
                const prevListArr = Array.from(listRef.current!.children)
                const margin = window
                    .getComputedStyle(listRef.current?.children[0]!)
                    .marginBottom.slice(0, -2)
                const itemHeight =
                    listRef.current!.children[0].getBoundingClientRect()
                        .height + parseInt(margin)

                console.log(margin)

                // Moves the active item up or down one position and updates the list
                oldList.splice(newIndex, 0, oldList.splice(oldIndex, 1)[0])

                // Loops through to animate position change
                prevListArr.forEach((c, prevIndex) => {
                    const item = c as HTMLDivElement

                    const newIndex = oldList.findIndex((child) => {
                        return child.trim() === item.innerText.trim()
                    })

                    if (newIndex !== prevIndex) {
                        // Sets the new index position as startElement and removes wiggle animation to handle position change animation
                        if (
                            activeItem?.innerHTML.trim() ===
                            item.innerHTML.trim()
                        ) {
                            setStartElement(newIndex)
                            item.style.animation = ''
                        }

                        // If item moved, then places the item in its previous position before the browser draws the update
                        requestAnimationFrame(() => {
                            const yOffset =
                                newIndex < prevIndex ? itemHeight : -itemHeight
                            item.style.transform = `translate(0,${yOffset}px)`
                            item.style.transition = 'transform 0s'

                            // Then changes transform & transition that moves the item to its new position
                            requestAnimationFrame(() => {
                                item.style.transform = ''
                                item.style.transition = `transform ${animationDuration}ms`
                            })
                        })
                    }
                })

                // Waits for re-render position change animation to finish and reapplies wiggle animation to the active item
                setTimeout(() => {
                    activeItem!.style.animation = 'wiggle 2s infinite'
                }, 400)
            }
        }

        const handleKeyPress = (e: KeyboardEvent) => {
            if (currentStep === renderOnStep && activeItem) {
                let activeItemIndex = list.findIndex(
                    (item) => item.trim() === activeItem.innerText.trim()
                )

                switch (e.key) {
                    case 'w':
                        if (!animatingPosition) {
                            setAnimatingPosition(true)
                            updateListOrder(
                                list,
                                activeItemIndex,
                                activeItemIndex - 1
                            )
                            setTimeout(() => {
                                setAnimatingPosition(false)
                            }, animationDuration)
                        } else {
                            console.log('Still running animation')
                        }
                        break
                    case 's':
                        if (!animatingPosition) {
                            setAnimatingPosition(true)
                            updateListOrder(
                                list,
                                activeItemIndex,
                                activeItemIndex + 1
                            )
                            setTimeout(() => {
                                setAnimatingPosition(false)
                            }, animationDuration)
                        } else {
                            console.log('Still running animation')
                        }
                        break
                    case 'Enter':
                        if (activeItem === e.target) {
                            activeItem.click()
                        }
                        break
                }
            }
        }

        document.addEventListener('keydown', handleKeyPress)

        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [
        activeItem,
        list,
        setList,
        currentStep,
        renderOnStep,
        animatingPosition,
    ])

    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="w-4/5 h-screen relative">
                    <div>
                        <BackButton
                            currentStep={currentStep}
                            onClick={() =>
                                setTimeout(() => {
                                    goBackOneStep()
                                }, 200)
                            }
                        />
                        <div className="absolute top-32">
                            <div className="text-3xl leading-10 font-medium">
                                {question}
                            </div>
                            <div className="font-normal text-gray-600 mt-2">
                                {language.trim() === 'Danish'.trim()
                                    ? 'Arrangér svarene i rækkefølge hvor 1 er vigtigst'
                                    : 'Arrange the answers in order where 1 is the most important'}
                            </div>
                            <div className="font-bold text-gray-600 mt-4">
                                {language.trim() === 'Danish'.trim()
                                    ? 'Tryk for at vælge. Tryk igen for at navigere videre.'
                                    : 'Tap to choose. Tap again to navigate again.'}
                            </div>
                            <div className="flex row-auto text-lg font-normal mt-10 w-full">
                                <div className="flex flex-col justify-between mr-6 py-5">
                                    {list.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="mb-5 text-blue-500"
                                            >
                                                {index + 1}
                                            </div>
                                        )
                                    })}
                                </div>
                                <div ref={listRef} className="w-full">
                                    {list.map((item, index) => {
                                        return (
                                            <Touchless
                                                key={item}
                                                startElement={
                                                    startElement === index
                                                }
                                                className={
                                                    'shadow-inactive rounded-xl flex items-center bg-white p-4 py-3 mb-5 w-full border-4 border-transparent'
                                                }
                                                onClick={(e) => {
                                                    const target = e.target as HTMLDivElement
                                                    if (activeItem !== target) {
                                                        target.style.animation =
                                                            'wiggle 2s infinite'
                                                        customKeys.initiate()

                                                        setActiveItem(target)
                                                        setStartElement(index)
                                                    } else {
                                                        target.style.animation =
                                                            ''
                                                        customKeys.clear()
                                                        setActiveItem(null)
                                                    }
                                                }}
                                            >
                                                <img
                                                    src={Arrows}
                                                    alt="arrows"
                                                    className="mr-4"
                                                />
                                                <span>{item}</span>
                                            </Touchless>
                                        )
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
    )
}

export default RankingQuestion
