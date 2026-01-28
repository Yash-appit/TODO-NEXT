'use client';
import dynamic from 'next/dynamic';
import React from 'react';

const Finalize = dynamic(() => import('./Finalize'), { ssr: false });

const FinalizeWrapper = () => {
    return <Finalize />;
};

export default FinalizeWrapper;
