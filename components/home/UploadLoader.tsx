import React from 'react';
import Lottie from 'lottie-react';
import resloader from '@/Animations/res-load.json';

const UploadLoader = () => {
    return (
        <Lottie
            className="lottie"
            animationData={resloader}
            loop
            autoplay
        />
    );
};

export default UploadLoader;
