import { createContext, useState, useEffect } from 'react';
import axiosConfig from '../axiosConfig';

const DataQuizsContext = createContext({});

function DataQuizsProvider({ children }) {
    const [quizsDatas, setQuizsDatas] = useState({data:[]});
    const [countAnwser, setCountAnwser] = useState(0);
    const [countCorrect, setCountCorrect] = useState(0);

    const getNewTestService = async () => {
        setQuizsDatas({data:[]});
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
            console.log(startTime);
        if (result?.data?.results.length > 0) {
            setQuizsDatas({data:result?.data?.results,start_time:startTime });
        }
    }

    async function updateQuestionById(index, userAnwser) {
        quizsDatas.data[index].user_answer = userAnwser;
        console.log(quizsDatas.data[index].user_answer, index);
        setCountAnwser((countAnwser) => countAnwser + 1);
        if (quizsDatas.data[index].user_answer === quizsDatas.data[index].correct_answer) {
            setCountCorrect((countCorrect) => countCorrect + 1);
            console.log(quizsDatas.data[index].user_answer, quizsDatas.data[index].correct_answer);
        }
    }
    const contextValue = {
        quizsDatas,
        countAnwser,
        addQuizsData,
        updateQuestionById,
        countCorrect,
    };
    return <DataQuizsContext.Provider value={contextValue}>{children}</DataQuizsContext.Provider>;
}
export { DataQuizsProvider, DataQuizsContext };
