import React, { useEffect, useContext, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SadElement, QuizBumpElement, CongratsElement } from '../components/animatedElements';
import { Link } from 'react-router-dom';
import { MultichoiceQuestion } from '../components/question_card/multichoiceQuestion';
import { DataQuizsContext } from '../store/DataQuizsContext';
import { createAnswers } from '../utils/createAnswers';
import { getDuration } from '../utils/getDuration';

function TestLayout() {
    const context = useContext(DataQuizsContext);
    const [isFinal, setIsFinal] = useState(false);
    const [statusLoading, setStatusLoading] = useState(true);
    const [id, setId] = useState(context?.restoreQuizDataFromLocalStorage()?.countAnswer || 0);
    const [answers, setAnswers] = useState([]);

    const next = () => {
        setId((prevId) => prevId + 1);
    };
    useEffect(() => {
        if (
            context?.restoreQuizDataFromLocalStorage()?.data?.length === 0 ||
            context?.restoreQuizDataFromLocalStorage()?.data.length ===
                context?.restoreQuizDataFromLocalStorage()?.countAnswer
        ) {
            context.addQuizData();
            setId(0);
        }
    }, []);

    useEffect(() => {
        if (context.quizData?.data?.length !== 0) {
            setStatusLoading(false);
        }
    }, [context?.quizData?.data]);

    useEffect(() => {
        if (context.quizData?.data?.length !== 0) {
            const answers = createAnswers(
                context.quizData?.data[id]?.incorrect_answers,
                context.quizData?.data[id]?.correct_answer,
            );
            setAnswers(answers);
        }
    }, [id, context.quizData?.data]);

    useEffect(() => {
        if (id + 1 > context.quizData?.data?.length && context.quizData?.data?.length !== 0) {
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
                                        {context.quizData?.countCorrect / context.quizData?.data.length >= 0.5 ? (
                                            <CongratsElement width={300} height={300}></CongratsElement>
                                        ) : (
                                            <SadElement width={300} height={300}></SadElement>
                                        )}
                                    </div>
                                    <div className="max-w-[300px]">
                                        <h2 className="text-4xl text-center font-bold mb-6 ">
                                            {context.quizData?.countCorrect / context.quizData?.data.length >= 0.5
                                                ? 'Congratulations!!'
                                                : 'Completed!'}
                                        </h2>
                                        <p className="text-2xl text-center text-gray-800">
                                            {`${context.quizData?.countCorrect} / ${
                                                context.quizData?.data.length
                                            } correct answer in ${getDuration(
                                                context.quizData?.start_time,
                                                context.quizData?.end_time,
                                            )}`}
                                        </p>
                                        <div className="mt-14 flex flex-row justify-center space-x-4">
                                            <Link
                                                to={'/'}
                                                onClick={() => {
                                                    context.resetQuizData();
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
                                    question={context.quizData?.data[id]?.question}
                                    answers={answers}
                                    updateNumberCorrect={undefined}
                                    title={`Question ${1 + id}/${context.quizData?.data.length}`}
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
