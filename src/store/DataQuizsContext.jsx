import { createContext, useState, useEffect } from 'react';
import axiosConfig from '../axiosConfig';

const DataQuizsContext = createContext({});

function DataQuizsProvider({ children }) {
    const [quizsData, setQuizsData] = useState({ data: [], countAnswer: 0, countCorrect: 0 });
    const [quizsDataArray, setQuizsDataArray] = useState([]);
    const [isComfirm, setIsComfirm] = useState(false);

    useEffect(() => {
        setQuizsDataArray(restoreQuizsDataArrayFromLocalStorage());
    }, []);

    useEffect(() => {
        if (restoreQuizsDataFromLocalStorage()?.countAnswer < restoreQuizsDataFromLocalStorage()?.data?.length) {
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

    //add end_time
    useEffect(() => {
        if (quizsData?.countAnswer === quizsData?.data?.length && quizsData?.countAnswer > 0) {
            const end_time = new Date();
            setQuizsData((prevState) => ({
                ...prevState,
                end_time,
            }));
        }
    }, [quizsData?.countAnswer]);
    // add quizsdata into array
    useEffect(() => {
        if (quizsData?.countAnswer === quizsData?.data?.length && quizsData?.countAnswer > 0 && quizsData.end_time) {
            setQuizsDataArray((preArray) => [quizsData, ...preArray]);
            setIsComfirm(false);
        }
    }, [quizsData]);

    const getNewTestService = async () => {
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
                countAnswer: 0,
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
    const resetQuizsData = () => {
        setQuizsData({
            data: [],
            countAnswer: 0,
            countCorrect: 0,
        });
    };

    function restoreQuizsDataFromLocalStorage() {
        try {
            const serializedData = localStorage.getItem('quizsData');
            if (serializedData === null) {
                return { data: [], countAnswer: 0, countCorrect: 0 };
            }
            return JSON.parse(serializedData);
        } catch (error) {
            console.error('Error restoring quizsData from localStorage:', error);
            return { data: [], countAnswer: 0, countCorrect: 0 };
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

    async function updateQuestionById(index, userAnswer) {
        quizsData.data[index].user_answer = userAnswer;

        setQuizsData((prevState) => ({
            ...prevState,
            countAnswer: prevState.countAnswer + 1,
            countCorrect:
                userAnswer === prevState.data[index].correct_answer
                    ? prevState.countCorrect + 1
                    : prevState.countCorrect,
        }));
    }
    function resetComfirm(isTrue = true) {
        if (isTrue === true) resetQuizsData();
        setIsComfirm(false);
    }
    const contextValue = {
        isComfirm,
        quizsData,
        addQuizsData,
        updateQuestionById,
        resetComfirm,
        resetQuizsData,
        restoreQuizsDataFromLocalStorage,
        restoreQuizsDataArrayFromLocalStorage,
    };

    return <DataQuizsContext.Provider value={contextValue}>{children}</DataQuizsContext.Provider>;
}

export { DataQuizsProvider, DataQuizsContext };
