import StudentsElement from '../components/animatedElements/studentsElement';

const Home = () => {
    return (
        <>
            <title>Sipo English</title>
            <div className="flex flex-row flex-wrap justify-around items-center mt-24 gap-y-20">
                <div className="max-w-[300px]">
                    <h1 className="text-6xl font-semibold text-zinc-800">Sipo Quiz</h1>

                    <div className="mt-28 flex flex-row justify-center space-x-4">
                        <button className="w-fit px-8 py-3 border border-gray-300 rounded-md hover:bg-zinc-100">
                            Dùng ngay
                        </button>
                    </div>
                </div>
                <div className="lg:visible md:invisible rounded-full">
                    <StudentsElement width={500} height={500}></StudentsElement>
                </div>
            </div>
        </>
    );
};

export default Home;
