import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataQuizsContext } from '../store/DataQuizsContext';
import QuizItem from '../components/QuizItem';
import ComfirmElement from '../components/animatedElements/comfirmElement';

const History = () => {
    const context = useContext(DataQuizsContext);
    const [quizDataArray, setQuizDataArray] = useState(context.restoreQuizDataArrayFromLocalStorage());
    if (quizDataArray.length == 0)
        return (
            <div className="h-screen w-screen flex flex-col items-center mt-20">
                <h1 className="text-6xl font-semibold text-zinc-800">Sipo Quiz</h1>
                <h3 className="text-[25px] font-semibold tex2-zinc-600 text-center mt-6 mb-10">
                    You haven't completed any quizzes.
                </h3>
                <Link to={'/quiz'} className="w-fit px-8 py-3 border border-gray-300 rounded-md">
                    Start Quiz!
                </Link>
                <ComfirmElement width={500} height={500}></ComfirmElement>
            </div>
        );
    return (
        <div className="w-4/5 flex flex-col items-center">
            <h1 className="font-medium text-3xl mt-20 mb-10">SIPO QUIZ - HISTORY</h1>
            <Link to="/" className="w-fit px-8 py-3 border border-gray-300 rounded-md hover:bg-zinc-100 mb-8">
                Home
            </Link>
            <div className="flex flex-col flex-wrap justify-around items-center  gap-y-10 p-10  border rounded-2xl border-gray-200 w-full">
                <div className="flex flex-col md:grid grid_quiz max-sm:justify-between justify-center gap-3 w-full">
                    {quizDataArray?.map((quizData, index) => (
                        <QuizItem quizData={quizData} index={index} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default History;
