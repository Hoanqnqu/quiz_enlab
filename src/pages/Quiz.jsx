import React, { useEffect, useContext, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import QuizBumpElement from '../components/animatedElements/QuizBumpElement';
import CongratsElement from '../components/animatedElements/congratsElement';
import { MultichoiceQuestion } from '../components/question_card/multichoiceQuestion';
import { DataQuizsContext } from '../store/DataQuizsContext';
import { createAnswers } from '../utils/createAnswers';
import { Link } from 'react-router-dom';
function TestLayout() {
    const context = useContext(DataQuizsContext);
    const [isFinal, setIsFinal] = useState(false);
    const [statusLoading, setStatusLoading] = useState(true);
    const [id, setId] = useState(0);
    const [answers, setAnswer] = useState([]);
    const next = () => {
        setId((prevId) => prevId + 1);
    };
    useEffect(() => {
        if (context.quizsDatas?.data?.length !== 0) {
            setStatusLoading(false);
        }
    }, [context.quizsDatas]);

    useEffect(() => {
        if (context.quizsDatas?.data?.length !== 0) {
            console.log(context.quizsDatas?.data);
            const answers = createAnswers(
                context.quizsDatas?.data[id]?.incorrect_answers,
                context.quizsDatas?.data[id]?.correct_answer,
            );
            setAnswer(answers);
        }
    }, [id, context.quizsDatas]);

    useEffect(() => {
        if (id + 1 > context.quizsDatas?.data?.length && context.quizsDatas?.data?.length !== 0) setIsFinal(true);
    }, [id]);
    return (
        <div className="w-screen min-h-screen pt-20 ">
            {statusLoading ? (
                <QuizBumpElement width={500} height={500}></QuizBumpElement>
            ) : (
                <AnimatePresence className>
                    <div className="w-full h-full flex flex-col items-center ">
                        <h1 className="font-medium text-3xl mb-20">SIPO QUIZ</h1>
                        <div>
                            {isFinal ? (
                                <div className="flex flex-row space-x-4">
                                    <div className="flex flex-col space-y-16 pt-10">
                                        <div>
                                            <h1 className="text-3xl font-medium mb-4">Kết quả</h1>
                                            <p className="text-8xl">
                                                {`${context.countCorrect} / ${context.quizsDatas?.data.length}`}
                                            </p>
                                        </div>
                                        <Link to={'/'} className="w-fit px-8 py-3 border border-gray-300 rounded-md">
                                            Home
                                        </Link>
                                    </div>
                                    <div>
                                        <CongratsElement width={400} height={400}></CongratsElement>
                                    </div>
                                </div>
                            ) : (
                                <MultichoiceQuestion
                                    id={id}
                                    key={id}
                                    question={context.quizsDatas?.data[id]?.question}
                                    userAnswer={context.quizsDatas?.data[id]?.userAnswer}
                                    answers={answers}
                                    updateNumberCorrect={undefined}
                                    title={`Question ${1 + id}/${context.quizsDatas?.data.length}`}
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
