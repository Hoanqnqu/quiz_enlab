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
    const next = () => {
        setId((prevId) => prevId + 1);
    };
    useEffect(() => {
        if (context.quizsDatas.length !== 0) {
            setStatusLoading(false);
        }
    }, [context.quizsDatas]);

    return (
        <div className="w-screen min-h-screen flex flex-col items-center mt-20">
            {statusLoading ? (
                <QuizBumpElement width={500} height={500}></QuizBumpElement>
            ) : (
                <AnimatePresence>
                    <div className="w-screen min-h-screen flex flex-col items-center ">
                        <h1 className="font-medium text-3xl mb-20">Bài kiểm tra</h1>
                        <div>
                            {isFinal ? (
                                <div className="flex flex-row space-x-4">
                                    <div className="flex flex-col space-y-16 pt-10">
                                        <div>
                                            <h1 className="text-3xl font-medium mb-4">Kết quả</h1>
                                            <p className="text-8xl">
                                                {/* {`${context.countCorrect} / ${context.testsDatas.length}`} */}
                                            </p>
                                        </div>
                                        <Link
                                            to={'/dashboard'}
                                            className="w-fit px-8 py-3 border border-gray-300 rounded-md"
                                        >
                                            {' '}
                                            Về trang chính
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
                                    question={context.quizsDatas[id]?.question}
                                    userAnswer={context.quizsDatas[id]?.userAnswer}
                                    answers={createAnswers(
                                        context.quizsDatas[id]?.incorrect_answers,
                                        context.quizsDatas[id]?.correct_answer,
                                    )}
                                    updateNumberCorrect={undefined}
                                    title={`Câu ${1 + id}`}
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
