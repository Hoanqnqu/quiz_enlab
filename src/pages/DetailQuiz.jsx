import React, { useContext, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import { MultichoiceQuestion } from '../components/question_card/multichoiceQuestion';
import { DataQuizsContext } from '../store/DataQuizsContext';
import { createAnswers } from '../utils/createAnswers';
import { NotFoundElement } from '../components/animatedElements';

const DetailQuiz = () => {
    const context = useContext(DataQuizsContext);
    const [quizsDataArray, setQuizsDataArray] = useState(context.restoreQuizsDataArrayFromLocalStorage());
    const [id, setId] = useState(0);
    const { id_quiz } = useParams();
    const next = () => {
        setId((prevId) => prevId + 1);
    };
    if (0 > id_quiz || id_quiz >= quizsDataArray.length)
        return (
            <div className="h-screen w-screen flex flex-col items-center mt-20">
                <NotFoundElement width={500} height={500}></NotFoundElement>
                <Link to={'/'} className="w-fit px-8 py-3 border border-gray-300 rounded-md">
                    Home
                </Link>
            </div>
        );
    else if (id === quizsDataArray[id_quiz].data.length) {
        return <Navigate to={'/history'} replace={true} />;
    } else
        return (
            <div className="w-screen min-h-screen pt-20">
                <h1 className="font-medium text-3xl text-center mb-20">SIPO QUIZ - REVIEW</h1>
                <AnimatePresence>
                    <div className="w-full h-full flex flex-col items-center">
                        <MultichoiceQuestion
                            id={id}
                            key={id}
                            question={quizsDataArray[id_quiz].data[id]?.question}
                            userAnswer={quizsDataArray[id_quiz].data[id]?.user_answer}
                            answers={createAnswers(
                                quizsDataArray[id_quiz].data[id].incorrect_answers,
                                quizsDataArray[id_quiz].data[id].correct_answer,
                            )}
                            updateNumberCorrect={undefined}
                            title={`Question ${1 + id}/${quizsDataArray[id_quiz].data.length}`}
                            next={next}
                        />
                    </div>
                </AnimatePresence>
            </div>
        );
};

export default DetailQuiz;
