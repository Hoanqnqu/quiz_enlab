import React, { useContext, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MultichoiceQuestion } from '../components/question_card/multichoiceQuestion';
import { DataQuizsContext } from '../store/DataQuizsContext';
import { createAnswers } from '../utils/createAnswers';
import { Navigate } from 'react-router-dom';

const DetailQuiz = () => {
    const context = useContext(DataQuizsContext);
    const [quizsDataArray, setQuizsDataArray] = useState(context.restoreQuizsDataArrayFromLocalStorage());
    const [id, setId] = useState(0);
    const next = () => {
        setId((prevId) => prevId + 1);
    };
    if (id === quizsDataArray[0].data.length) return <Navigate to={'/history'} replace={true} />;
    
    return (
        <div className="w-screen min-h-screen pt-20">
            <AnimatePresence>
                <div className="w-full h-full flex flex-col items-center">
                    <MultichoiceQuestion
                        id={id}
                        key={id}
                        question={quizsDataArray[0].data[id]?.question}
                        userAnswer={quizsDataArray[0].data[id]?.user_answer}
                        answers={createAnswers(
                            quizsDataArray[0].data[id].incorrect_answers,
                            quizsDataArray[0].data[id].correct_answer,
                        )}
                        updateNumberCorrect={undefined}
                        title={`Question ${1 + id}/${quizsDataArray[0].data.length}`}
                        next={next}
                    />
                </div>
            </AnimatePresence>
        </div>
    );
};

export default DetailQuiz;
