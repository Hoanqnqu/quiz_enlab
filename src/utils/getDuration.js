export const getDuration = (startTime, endTime) => {
    

    const jsonStringS = JSON.stringify(startTime);
    const parsedDateS = new Date(JSON.parse(jsonStringS));
    const jsonStringE = JSON.stringify(endTime);
    const parsedDateE = new Date(JSON.parse(jsonStringE));
    const timeDifference = parsedDateE - parsedDateS;
    console.log(parsedDateE , parsedDateS);
    // Chuyển đổi khoảng thời gian sang giờ, phút, giây
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return ` ${hours}h ${minutes}' ${seconds}s`;
};
