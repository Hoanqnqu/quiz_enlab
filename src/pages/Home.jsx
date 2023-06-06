import { Link } from 'react-router-dom';
import StudentsElement from '../components/animatedElements/studentsElement';
import { useContext } from 'react';
import { DataQuizsContext } from '../store/DataQuizsContext';

const Home = () => {
    const context = useContext(DataQuizsContext);

    return (
        <>
            <title>Sipo English</title>
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
        </>
    );
};

export default Home;
