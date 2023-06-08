import React from 'react';
import { NotFoundElement } from '../components/animatedElements';
import { Link } from 'react-router-dom';
const Error = () => {
    return (
        <div className="h-screen w-screen flex flex-col items-center mt-20">
            <NotFoundElement width={500} height={500}></NotFoundElement>
            <Link to={'/'} className="w-fit px-8 py-3 border border-gray-300 rounded-md">
                Home
            </Link>
        </div>
    );
};

export default Error;
