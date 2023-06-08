export const createAnswers = (incorrectAnswers, correctAnswer) => {
    
    const shuffledAnswers = [
        ...(incorrectAnswers?.map((item) => ({ text: item, isSolution: false })) || []),
        { text: correctAnswer, isSolution: true },
    ];

    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
    }
    return shuffledAnswers;
};
