import { createContext, useState, useEffect } from 'react';
import axiosConfig from '../axiosConfig';

const DataQuizsContext = createContext({});

function DataQuizsProvider({ children }) {
    const [quizsDatas, setQuizsDatas] = useState({ data: [], countAnwser: 0, countCorrect: 0 });

    const getNewTestService = async () => {
        setQuizsDatas({ data: [] });
        try {
            const res = await axiosConfig.get('/api.php?amount=5');
            return res;
        } catch (err) {
            console.log(err);
        }
    };

    async function addQuizsData() {
        const result = await getNewTestService();
        const startTime = new Date();

        if (result?.data?.results.length > 0) {
            setQuizsDatas({
                data: result?.data?.results,
                start_time: startTime,
                countAnwser: 0,
                countCorrect: 0,
            });
        }
    }

    async function updateQuestionById(index, userAnwser) {
        quizsDatas.data[index].user_answer = userAnwser;

        setQuizsDatas((prevState) => ({
            ...prevState,
            countAnwser: prevState.countAnwser + 1,
            countCorrect:
                userAnwser === prevState.data[index].correct_answer
                    ? prevState.countCorrect + 1
                    : prevState.countCorrect,
        }));
    }

    const contextValue = {
        quizsDatas,
        addQuizsData,
        updateQuestionById,
    };

    return <DataQuizsContext.Provider value={contextValue}>{children}</DataQuizsContext.Provider>;
}

export { DataQuizsProvider, DataQuizsContext };
