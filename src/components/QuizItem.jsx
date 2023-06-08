import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';

import { getDuration } from '../utils/getDuration';
const QuizItem = ({ quizData, index }) => {
    return (
        <motion.button
            key={1}
            className={'border rounded-lg w-full p-3 text-left '}
            onClick={() => {}}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
        >
            <Link to={`/history/${index}`} className="flex justify-between">
                <div className="flex flex-col justify-between">
                    <h4 className="text-3xl font-bold">Quiz {index + 1}</h4>
                    <p className="text-center text-xl font-bold text-gray-600 mt-2">
                        {quizData.countCorrect}/{quizData.countAnswer}
                    </p>
                </div>
                <div className="flex flex-col justify-between">
                    <p className="text-xs text-gray-600 text-right">{moment(quizData.end_time).fromNow()}</p>
                    <p className="text-right">{getDuration(quizData.start_time, quizData.end_time)}</p>
                </div>
            </Link>
        </motion.button>
    );
};

export default QuizItem;
