import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/loading.json';

export default function LoadingElement({ width = 130, height = 130 }) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        renderer: 'svg',
    };
    return <Lottie options={defaultOptions} height={height} width={width} />;
}
