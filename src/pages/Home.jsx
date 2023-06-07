import { Link } from 'react-router-dom';
import StudentsElement from '../components/animatedElements/studentsElement';
import ComfirmElement from '../components/animatedElements/comfirmElement';
import { useContext, useEffect, useState } from 'react';
import { DataQuizsContext } from '../store/DataQuizsContext';

const Home = () => {
    const context = useContext(DataQuizsContext);

    return (
        <>
            {context.isComfirm ? (
                <div className="flex flex-row flex-wrap justify-around items-center mt-36 gap-y-10">
                    <div className="max-w-[300px] flex flex-row flex-wrap justify-center items-center ">
                        <h1 className="text-6xl font-semibold text-zinc-800">Sipo Quiz</h1>
                        <h3 className="text-[25px] font-semibold tex2-zinc-600 text-center mt-6">
                            Do you want to continue with an unfinished quiz?
                        </h3>
                        <div className="mt-14 flex flex-row justify-center space-x-4">
                            <Link
                                to="/quiz"
                                onClick={() => {
                                    context.resetComfirm();
                                }}
                                className="w-fit px-8 py-3 border border-gray-300 rounded-md hover:bg-zinc-100"
                            >
                                Yes
                            </Link>
                            <button
                                onClick={() => {
                                    context.resetComfirm();
                                }}
                                className="w-fit px-8 py-3 border border-gray-300 rounded-md hover:bg-zinc-100"
                            >
                                No
                            </button>
                        </div>
                    </div>
                    <div className="rounded-full">
                        <ComfirmElement width={400} height={400}></ComfirmElement>
                    </div>
                </div>
            ) : (
                <div className="flex flex-row flex-wrap justify-around items-center mt-36 gap-y-10">
                    <div className="max-w-[300px]">
                        <h1 className="text-6xl font-semibold text-zinc-800">Sipo Quiz</h1>

                        <div className="mt-20 flex flex-row justify-center space-x-4">
                            <Link
                                to="/quiz"
                                onClick={() => context.addQuizsData()}
                                className="w-fit px-8 py-3 border border-gray-300 rounded-md hover:bg-zinc-100"
                            >
                                Start Quiz!
                            </Link>
                        </div>
                    </div>
                    <div className="rounded-full">
                        <StudentsElement width={400} height={400}></StudentsElement>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
