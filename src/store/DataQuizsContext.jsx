import { createContext, useState, useEffect } from 'react';
import axiosConfig from '../axiosConfig';

const DataQuizsContext = createContext({});

function DataQuizsProvider({ children }) {
    const [quizData, setQuizData] = useState({ data: [], countAnswer: 0, countCorrect: 0 });
    const [quizDataArray, setQuizDataArray] = useState([]);
    const [isComfirm, setIsComfirm] = useState(false);

    useEffect(() => {
        setQuizDataArray(restoreQuizDataArrayFromLocalStorage());
    }, []);

    useEffect(() => {
        if (restoreQuizDataFromLocalStorage()?.countAnswer < restoreQuizDataFromLocalStorage()?.data?.length) {
            setQuizData(restoreQuizDataFromLocalStorage());
            setIsComfirm(true);
        }
    }, []);

    useEffect(() => {
        saveQuizDataToLocalStorage(quizData);
    }, [quizData]);

    useEffect(() => {
        saveQuizDataArrayToLocalStorage(quizDataArray);
    }, [quizDataArray]);

    //add end_time
    useEffect(() => {
        if (quizData?.countAnswer === quizData?.data?.length && quizData?.countAnswer > 0) {
            const end_time = new Date();
            setQuizData((prevState) => ({
                ...prevState,
                end_time,
            }));
        }
    }, [quizData?.countAnswer]);

    // add quizData into array with a maximum of 10 elements
    useEffect(() => {
        if (quizData?.countAnswer === quizData?.data?.length && quizData?.countAnswer > 0 && quizData.end_time) {
            setQuizDataArray((prevArray) => {
                const newArray = [quizData, ...prevArray.slice(0, import.meta.env.VITE_REACT_APP_LIMIT_QUIZ - 1)];
                return newArray;
            });
            setIsComfirm(false);
        }
    }, [quizData]);

    
    const getNewTestService = async () => {
        try {
            const res = await axiosConfig.get(`/api.php?amount=${import.meta.env.VITE_REACT_APP_LIMIT_QUESTION}`);
            return res;
        } catch (err) {
            console.log(err);
        }
    };

    async function addQuizData() {
        const result = await getNewTestService();
        const startTime = new Date();

        if (result?.data?.results.length > 0) {
            setQuizData({
                data: result?.data?.results,
                start_time: startTime,
                countAnswer: 0,
                countCorrect: 0,
            });
        }
    }
    const saveQuizDataToLocalStorage = (quizData) => {
        try {
            const serializedData = JSON.stringify(quizData);
            localStorage.setItem('quizData', serializedData);
        } catch (error) {
            console.error('Error saving quizData to localStorage:', error);
        }
    };

    const saveQuizDataArrayToLocalStorage = (quizDataArray) => {
        try {
            const serializedDataArray = JSON.stringify(quizDataArray);
            localStorage.setItem('quizDataArray', serializedDataArray);
        } catch (error) {
            console.error('Error saving quizData to localStorage:', error);
        }
    };
    const resetQuizData = () => {
        setQuizData({
            data: [],
            countAnswer: 0,
            countCorrect: 0,
        });
    };

    function restoreQuizDataFromLocalStorage() {
        try {
            const serializedData = localStorage.getItem('quizData');
            if (serializedData === null) {
                return { data: [], countAnswer: 0, countCorrect: 0 };
            }
            return JSON.parse(serializedData);
        } catch (error) {
            console.error('Error restoring quizData from localStorage:', error);
            return { data: [], countAnswer: 0, countCorrect: 0 };
        }
    }

    function restoreQuizDataArrayFromLocalStorage() {
        try {
            const serializedDataArray = localStorage.getItem('quizDataArray');
            if (serializedDataArray === null) {
                return [];
            }
            return JSON.parse(serializedDataArray);
        } catch (error) {
            console.error('Error restoring quizDataArray from localStorage:', error);
            return [];
        }
    }

    async function updateQuestionById(index, userAnswer) {
        quizData.data[index].user_answer = userAnswer;

        setQuizData((prevState) => ({
            ...prevState,
            countAnswer: prevState.countAnswer + 1,
            countCorrect:
                userAnswer === prevState.data[index].correct_answer
                    ? prevState.countCorrect + 1
                    : prevState.countCorrect,
        }));
    }
    function resetComfirm(isTrue = true) {
        if (isTrue === true) resetQuizData();
        setIsComfirm(false);
    }
    const contextValue = {
        isComfirm,
        quizData,
        addQuizData,
        updateQuestionById,
        resetComfirm,
        resetQuizData,
        restoreQuizDataFromLocalStorage,
        restoreQuizDataArrayFromLocalStorage,
    };

    return <DataQuizsContext.Provider value={contextValue}>{children}</DataQuizsContext.Provider>;
}

export { DataQuizsProvider, DataQuizsContext };
