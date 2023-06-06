import { createContext, useState, useEffect } from 'react';
import axiosConfig from '../axiosConfig';

const DataQuizsContext = createContext({});

function DataQuizsProvider({ children }) {
    const [quizsDatas, setQuizsDatas] = useState([]);
    const [isFullAnswer, setIsFullAnswer] = useState(false);
    const [countAnwser, setCountAnwser] = useState(0);
    const [countCorrect, setCountCorrect] = useState(0);

    useEffect(() => {
        if (quizsDatas?.length > 0 && quizsDatas?.length === countAnwser) {
            console.log(quizsDatas.length);
            setIsFullAnswer(true);
        }
        console.log(countAnwser);
    }, [countAnwser]);
    useEffect(() => {
        // addQuizsData();
        // console.log('1');
    }, []);

    const getNewTestService = async () => {
        try {
            const res = await axiosConfig.get('/api.php?amount=20');
            return res;
        } catch (err) {
            console.log(err);
        }
    };
    async function addQuizsData() {
        const result = await getNewTestService();

        if (result?.data?.results) {
            console.log('1');
            setQuizsDatas(result?.data?.results);
        }
        return result?.data?.results;
    }
    const contextValue = {
        addQuizsData,
        quizsDatas,
    };
    return <DataQuizsContext.Provider value={contextValue}>{children}</DataQuizsContext.Provider>;
}
export { DataQuizsProvider, DataQuizsContext };
