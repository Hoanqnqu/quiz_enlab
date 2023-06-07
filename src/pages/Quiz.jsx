import React, { useEffect, useContext, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import QuizBumpElement from '../components/animatedElements/QuizBumpElement';
import CongratsElement from '../components/animatedElements/congratsElement';
import SadElement from '../components/animatedElements/sadElement';
import { MultichoiceQuestion } from '../components/question_card/multichoiceQuestion';

import { DataQuizsContext } from '../store/DataQuizsContext';
import { createAnswers } from '../utils/createAnswers';
import { Link } from 'react-router-dom';
import { getDuration } from '../utils/getDuration';

function TestLayout() {
    const context = useContext(DataQuizsContext);
    const [isFinal, setIsFinal] = useState(false);
    const [statusLoading, setStatusLoading] = useState(true);
    const [id, setId] = useState(context?.restoreQuizsDataFromLocalStorage()?.countAnswer || 0);
    const [answers, setAnswers] = useState([]);

    const next = () => {
        setId((prevId) => prevId + 1);
    };
    useEffect(() => {
        if (
            context?.restoreQuizsDataFromLocalStorage()?.data?.length === 0 ||
            context?.restoreQuizsDataFromLocalStorage()?.data.length ===
                context?.restoreQuizsDataFromLocalStorage()?.countAnswer
        ) {
            console.log(context?.restoreQuizsDataFromLocalStorage()?.data, context?.quizsData?.data);
            context.addQuizsData();
            setId(0);
        }
    }, []);

    useEffect(() => {
        if (context.quizsData?.data?.length !== 0) {
            setStatusLoading(false);
        }
    }, [context?.quizsData?.data]);

    useEffect(() => {
        if (context.quizsData?.data?.length !== 0) {
            const answers = createAnswers(
                context.quizsData?.data[id]?.incorrect_answers,
                context.quizsData?.data[id]?.correct_answer,
            );
            setAnswers(answers);
        }
    }, [id, context.quizsData?.data]);

    useEffect(() => {
        if (id + 1 > context.quizsData?.data?.length && context.quizsData?.data?.length !== 0) {
            setIsFinal(true);
        }
    }, [id]);

    return (
        <div className="w-screen min-h-screen pt-20">
            {statusLoading ? (
                <QuizBumpElement width={500} height={500}></QuizBumpElement>
            ) : (
                <AnimatePresence>
                    <div className="w-full h-full flex flex-col items-center">
                        <h1 className="font-medium text-3xl mb-20">SIPO QUIZ</h1>
                        <div>
                            {isFinal ? (
                                <div className="flex flex-row flex-wrap justify-around items-center  gap-y-10">
                                    <div className="rounded-full">
                                        {context.quizsData?.countCorrect / context.quizsData?.data.length >= 0.5 ? (
                                            <CongratsElement width={300} height={300}></CongratsElement>
                                        ) : (
                                            <SadElement width={300} height={300}></SadElement>
                                        )}
                                    </div>
                                    <div className="max-w-[300px]">
                                        <h2 className="text-4xl text-center font-bold mb-6 ">
                                            {context.quizsData?.countCorrect / context.quizsData?.data.length >= 0.5
                                                ? 'Congratulations!!'
                                                : 'Completed!'}
                                        </h2>
                                        <p className="text-2xl text-center text-gray-800">
                                            {`${context.quizsData?.countCorrect} / ${
                                                context.quizsData?.data.length
                                            } correct answer in ${getDuration(
                                                context.quizsData?.start_time,
                                                context.quizsData?.end_time,
                                            )}`}
                                        </p>
                                        <div className="mt-14 flex flex-row justify-center space-x-4">
                                            <Link
                                                to={'/'}
                                                onClick={() => {
                                                    context.resetQuizsData();
                                                }}
                                                className="w-fit px-8 py-3 border border-gray-300 rounded-md hover:bg-zinc-100"
                                            >
                                                Home
                                            </Link>
                                            <Link
                                                to="/history/0"
                                                onClick={() => {
                                                    context.resetComfirm();
                                                }}
                                                className="w-fit px-8 py-3 border border-gray-300 rounded-md hover:bg-zinc-100"
                                            >
                                                Review
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <MultichoiceQuestion
                                    id={id}
                                    key={id}
                                    question={context.quizsData?.data[id]?.question}
                                    answers={answers}
                                    updateNumberCorrect={undefined}
                                    title={`Question ${1 + id}/${context.quizsData?.data.length}`}
                                    next={next}
                                />
                            )}
                        </div>
                    </div>
                </AnimatePresence>
            )}
        </div>
    );
}

export default TestLayout;
