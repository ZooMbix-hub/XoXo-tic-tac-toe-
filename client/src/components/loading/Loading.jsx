import React from 'react';
import AnimateModal from '../AnimateModal';
import './LoadingStyle.scss';

const Loading = () => {
    return (
        <AnimateModal nameClass="loading">
            <div className="loader">
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__ball"></div>
            </div>
        </AnimateModal>
    )
}

export default Loading;