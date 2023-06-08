import React, { useEffect, useState, useContext } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { ToastContainerCustom, toast } from '../ToastCustom';
import { PrimaryButton } from '../button';
import { DataQuizsContext } from '../../store/DataQuizsContext';

function MultichoiceQuestion({ title = 'Full text question', question, answers, id, userAnswer, next }) {

    const [chosenIndex, setChosenIndex] = useState(-1);
 

    const [checked, setChecked] = useState(false);
    const context = useContext(DataQuizsContext);
    useEffect(() => {
        if (userAnswer) {
            setChecked(true);
            setChosenIndex(answers.findIndex((ans) => ans.text.trim() == userAnswer.trim()));
        }
    }, []);

    const checkButtonOnclick = () => {
        if (chosenIndex == -1) {
            return toast.error('Please choose the answer!');
        }
        setChecked(true);
        context.updateQuestionById(+id, answers[chosenIndex].text);
    };

    const getLabel = (index) => {
        if (checked && index == chosenIndex && !answers[index].isSolution) {
            return 'incorrect';
        } else if (checked && answers[index].isSolution) {
            return 'correct';
        } else if (!checked && index === chosenIndex) {
            return 'chosen';
        }
        return '';
    };

    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="questionCard multichoiceQuestion"
        >
            <div className="flex flex-col space-y-2">
                <div className="flex flex-row space-x-2">
                    <QuestionMarkCircleIcon className="w-5"></QuestionMarkCircleIcon>
                    <p>{title}</p>
                </div>
                <p className="text-lg font-bold">{question}</p>
            </div>

            <div className="flex flex-col w-full space-y-2">
                {answers?.map((ans, index) => {
                    const ansLabel = getLabel(index);

                    return (
                        <motion.button
                            key={index}
                            className={'border rounded-lg w-full p-3 text-left ' + ansLabel}
                            onClick={() => {
                                if (!checked) {
                                    if (index == chosenIndex) {
                                        setChosenIndex(-1);
                                    } else {
                                        setChosenIndex(index);
                                    }
                                }
                            }}
                            whileHover={{ scale: checked ? 1 : 1.05 }}
                            whileTap={{ scale: checked ? 1 : 0.9 }}
                        >
                            {ansLabel == 'correct' && <CheckCircleIcon className="w-6 inline-block mb-0.5 mr-2" />}
                            {ansLabel == 'incorrect' && <XCircleIcon className="w-6 inline-block mb-0.5 mr-2" />}
                            {ans.text}
                        </motion.button>
                    );
                })}
            </div>

            <PrimaryButton onClick={checked ? next : checkButtonOnclick} animate={{ x: checked ? 155 : 0 }}>
                {!checked ? 'Check' : 'Next question'}
            </PrimaryButton>

            <ToastContainerCustom />
        </motion.div>
    );
}

export { MultichoiceQuestion };
