import StudentsElement from '../components/animatedElements/studentsElement';

const Home = () => {
    return (
        <>
            <title>Sipo English</title>
            <div className="flex flex-row flex-wrap justify-around items-center mt-24 gap-y-10">
                <div className="max-w-[300px]">
                    <h1 className="text-6xl font-semibold text-zinc-800">Sipo Quiz</h1>

                    <div className="mt-10 flex flex-row justify-center space-x-4">
                        <button className="w-fit px-8 py-3 border border-gray-300 rounded-md hover:bg-zinc-100">
                            Dùng ngay
                        </button>
                    </div>
                </div>
                <div className="lg:visible md:invisible rounded-full">
                    <StudentsElement width={400} height={400}></StudentsElement>
                </div>
            </div>
        </>
    );
};

export default Home;
