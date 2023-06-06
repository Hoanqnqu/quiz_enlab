export const getDuration = (startTime, endTime) => {
    const timeDifference = endTime - startTime;

    // Chuyển đổi khoảng thời gian sang giờ, phút, giây
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return `Khoảng thời gian chênh lệch: ${hours} giờ, ${minutes} phút, ${seconds} giây.`;
};
