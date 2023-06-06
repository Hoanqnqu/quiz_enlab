import { createContext, useState, useEffect } from 'react';
import axiosConfig from '../axiosConfig';

const DataQuizsContext = createContext({});

function DataQuizsProvider({ children }) {
    const [quizsDatas, setQuizsDatas] = useState([]);
    const [countAnwser, setCountAnwser] = useState(0);
    const [countCorrect, setCountCorrect] = useState(0);
    useEffect(() => {
        if (quizsDatas.length > 0) {
            const startTime = new Date();
            quizsDatas[0].start_time = startTime;
            console.log(startTime);
        }
    }, [quizsDatas]);
    const getNewTestService = async () => {
        setQuizsDatas([]);
        try {
            const res = await axiosConfig.get('/api.php?amount=5');
            return res;
        } catch (err) {
            console.log(err);
        }
    };
    async function addQuizsData() {
        const result = await getNewTestService();

        if (result?.data?.results.length > 0) {
            setQuizsDatas(result?.data?.results);
        }
        return result?.data?.results;
    }

    async function updateQuestionById(index, userAnwser) {
        quizsDatas[index].user_answer = userAnwser;
        console.log(quizsDatas[index].user_answer, index);
        setCountAnwser((countAnwser) => countAnwser + 1);
        if (quizsDatas[index].user_answer === quizsDatas[index].correct_answer) {
            setCountCorrect((countCorrect) => countCorrect + 1);
            console.log(quizsDatas[index].user_answer, quizsDatas[index].correct_answer);
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
