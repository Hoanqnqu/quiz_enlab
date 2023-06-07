import { createContext, useState, useEffect } from 'react';
import axiosConfig from '../axiosConfig';

const DataQuizsContext = createContext({});

function DataQuizsProvider({ children }) {
    const [quizsData, setQuizsData] = useState({ data: [], countAnwser: 0, countCorrect: 0 });
    const [quizsDataArray, setQuizsDataArray] = useState([]);
    const [isComfirm, setIsComfirm] = useState(false);
    useEffect(() => {
        setQuizsDataArray(restoreQuizsDataArrayFromLocalStorage());
    }, []);

    useEffect(() => {
        if (restoreQuizsDataFromLocalStorage()?.countAnwser < restoreQuizsDataFromLocalStorage()?.data?.length) {
            setQuizsData(restoreQuizsDataFromLocalStorage());
            setIsComfirm(true);
        }
    }, []);

    useEffect(() => {
        saveQuizsDataToLocalStorage(quizsData);
    }, [quizsData]);

    useEffect(() => {
        saveQuizsDataArrayToLocalStorage(quizsDataArray);
    }, [quizsDataArray]);

    useEffect(() => {
        if (quizsData?.countAnwser === quizsData?.data?.length && quizsData?.countAnwser > 0) {
            const end_time = new Date();
            setQuizsData((prevState) => ({
                ...prevState,
                end_time,
            }));
        }
    }, [quizsData?.countAnwser]);
    useEffect(() => {
        if (quizsData?.countAnwser === quizsData?.data?.length && quizsData?.countAnwser > 0 && quizsData.end_time) {
            setQuizsDataArray((preArray) => [quizsData, ...preArray]);
        }
    }, [quizsData]);
    const getNewTestService = async () => {
        setQuizsData({ data: [] });
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
            setQuizsData({
                data: result?.data?.results,
                start_time: startTime,
                countAnwser: 0,
                countCorrect: 0,
            });
        }
    }
    const saveQuizsDataToLocalStorage = (quizsData) => {
        try {
            const serializedData = JSON.stringify(quizsData);
            localStorage.setItem('quizsData', serializedData);
        } catch (error) {
            console.error('Error saving quizsData to localStorage:', error);
        }
    };

    const saveQuizsDataArrayToLocalStorage = (quizsDataArray) => {
        try {
            const serializedDataArray = JSON.stringify(quizsDataArray);
            localStorage.setItem('quizsDataArray', serializedDataArray);
        } catch (error) {
            console.error('Error saving quizsData to localStorage:', error);
        }
    };

    function restoreQuizsDataFromLocalStorage() {
        try {
            const serializedData = localStorage.getItem('quizsData');
            if (serializedData === null) {
                return { data: [], countAnwser: 0, countCorrect: 0 };
            }
            return JSON.parse(serializedData);
        } catch (error) {
            console.error('Error restoring quizsData from localStorage:', error);
            return { data: [], countAnwser: 0, countCorrect: 0 };
        }
    }

    function restoreQuizsDataArrayFromLocalStorage() {
        try {
            const serializedDataArray = localStorage.getItem('quizsDataArray');
            if (serializedDataArray === null) {
                return [];
            }
            return JSON.parse(serializedDataArray);
        } catch (error) {
            console.error('Error restoring quizsDataArray from localStorage:', error);
            return [];
        }
    }

    async function updateQuestionById(index, userAnwser) {
        quizsData.data[index].user_answer = userAnwser;

        setQuizsData((prevState) => ({
            ...prevState,
            countAnwser: prevState.countAnwser + 1,
            countCorrect:
                userAnwser === prevState.data[index].correct_answer
                    ? prevState.countCorrect + 1
                    : prevState.countCorrect,
        }));
    }
    function resetComfirm() {
        setIsComfirm(false);
    }
    const contextValue = {
        isComfirm,
        quizsData,
        addQuizsData,
        updateQuestionById,
        resetComfirm,
    };

    return <DataQuizsContext.Provider value={contextValue}>{children}</DataQuizsContext.Provider>;
}

export { DataQuizsProvider, DataQuizsContext };
