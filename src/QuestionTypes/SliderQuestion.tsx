import React, { useRef, useState, useContext, useEffect } from 'react'
import { Touchless, useCustomKeys } from 'touchless-navigation'
import BackButton from '../BackButton'
import NextButton from '../NextButton'
import { LanguageContext } from '../QuestionSettings'
import './Slider.css'

export interface SliderQuestionProps {
    currentStep: number
    renderOnStep: number
    question: string
    rangeMin: number
    rangeMax: number
    intervals?: number
    startValue: number
    minLabel?: string
    maxLabel?: string
    handleChoice: (question: string, answer: string) => void
    goBackOneStep: () => void
}

const SliderQuestion: React.FC<SliderQuestionProps> = (props) => {
    const {
        currentStep,
        renderOnStep,
        question,
        rangeMin,
        rangeMax,
        intervals,
        startValue,
        minLabel,
        maxLabel,
        handleChoice,
        goBackOneStep,
    } = props
    const labelsRef = useRef<HTMLSpanElement>(null)
    const [selectedValue, setSelectedValue] = useState<number>(startValue)
    const highlightedClasses = ['font-semibold', 'scale-150', 'text-blue-600']
    const { language } = useContext(LanguageContext)
    let baseStyleClasses = [
        'inline-block',
        'ease-in-out',
        'transform',
        'transition',
        'scale-100',
    ]

    const updateSelected = (value: number) => {
        if (intervals && labelsRef.current) {
            labelsRef.current.children[selectedValue].classList.remove(
                ...highlightedClasses
            )
            labelsRef.current.children[value].classList.add(
                ...highlightedClasses
            )
        } else if (labelsRef.current) {
            let scaleFactorMin = (rangeMax - value) / (rangeMax - rangeMin) + 1
            let scaleFactorMax = (value - rangeMin) / (rangeMax - rangeMin) + 1

            labelsRef.current.children[0].setAttribute(
                'style',
                `transform: scale(${scaleFactorMin});`
            )
            labelsRef.current.children[1].setAttribute(
                'style',
                `transform: scale(${scaleFactorMax});`
            )
        }
        setSelectedValue(value)
    }

    const setIntervalLabels = () => {
        if (intervals) {
            let currentLabel = rangeMin
            const labels = []

            while (currentLabel <= rangeMax) {
                let labelText =
                    minLabel && currentLabel === rangeMin
                        ? minLabel
                        : maxLabel && currentLabel === rangeMax
                        ? maxLabel
                        : currentLabel
                let styleClasses =
                    currentLabel === selectedValue
                        ? highlightedClasses.concat(baseStyleClasses).join(' ')
                        : baseStyleClasses.join(' ')

                labels.push(
                    <span key={labelText} className={styleClasses}>
                        {labelText}
                    </span>
                )
                currentLabel++
            }
            return labels
        } else {
            return [
                <span key={minLabel} className={baseStyleClasses.join(' ')}>
                    {minLabel}
                </span>,
                <span key={maxLabel} className={baseStyleClasses.join(' ')}>
                    {maxLabel}
                </span>,
            ]
        }
    }

    const [usingCustomKeys, setUsingCustomKeys] = useState(false)

    const { clear, initiate } = useCustomKeys({
        swipeLeft: 'a',
        swipeRight: 'd',
        swipeDown: 's',
        swipeUp: 'w',
    })

    useEffect(() => {
        if (usingCustomKeys) {
            console.log('Using custom keys')

            const handleSliderKeys = (event: KeyboardEvent) => {
                switch (event.key) {
                    case 'a':
                        setSelectedValue((oldValue) => oldValue - 10)
                        break
                    case 'd':
                        setSelectedValue((oldValue) => oldValue + 10)
                        break
                    default:
                        break
                }
            }
            document.addEventListener('keydown', handleSliderKeys)
            return () => {
                document.removeEventListener('keydown', handleSliderKeys)
                console.log('Stopped using custom keys')
            }
        }
    }, [usingCustomKeys])

    return (
        <>
            {currentStep !== renderOnStep ? null : (
                <div className="w-4/5 h-screen relative">
                    <div>
                        <BackButton
                            currentStep={currentStep}
                            onClick={() => goBackOneStep()}
                        />
                        <div className="absolute top-32 w-full">
                            <div className="text-3xl leading-10 font-medium">
                                {question}
                            </div>
                            <div className="font-normal text-gray-600 mt-2">
                                {language === 'Danish'
                                    ? 'Swipe til det ønskede svar'
                                    : 'Swipe to your desired answer'}
                            </div>
                            <div className="justify-center mt-40">
                                <div className="justify-center flex text-xl mb-8 font-medium text-gray-800">
                                    {usingCustomKeys
                                        ? language === 'Danish'
                                            ? 'Tryk på slideren for at vælge'
                                            : 'Tap the slider to choose'
                                        : language === 'English'
                                        ? 'Slide to the left and the right - tap when you have chosen'
                                        : 'Træk til højre og venstre - tryk når du har valgt'}
                                </div>
                                <div className={`${usingCustomKeys ? '' : ''}`}>
                                    <Touchless
                                        startElement={true}
                                        onClick={() => {
                                            if (usingCustomKeys === false) {
                                                initiate()
                                            } else {
                                                clear()
                                            }
                                            setUsingCustomKeys(
                                                (prevValue) => !prevValue
                                            )
                                        }}
                                        className={`shadow-inactive rounded-xl border-4 border-transparent py-4 px-2 ${
                                            usingCustomKeys ? '' : ''
                                        }`}
                                    >
                                        <input
                                            type="range"
                                            min={rangeMin}
                                            max={rangeMax}
                                            value={selectedValue}
                                            step={intervals}
                                            onChange={(e) =>
                                                updateSelected(
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            className={`shadow-inactive overflow-hidden h-5 outline-none block w-full slider ${
                                                usingCustomKeys ? '' : ''
                                            }`}
                                        />
                                    </Touchless>
                                </div>

                                <span
                                    ref={labelsRef}
                                    className="flex justify-between font-normal text-2xl mt-2 text-blue-500 mx-2"
                                >
                                    {setIntervalLabels()}
                                </span>
                            </div>
                        </div>

                        <NextButton
                            currentStep={currentStep}
                            onClick={() =>
                                setTimeout(() => {
                                    handleChoice(
                                        question,
                                        selectedValue.toString()
                                    )
                                }, 200)
                            }
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default SliderQuestion
