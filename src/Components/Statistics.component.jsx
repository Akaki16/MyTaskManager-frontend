import React from 'react';
import PropTypes from 'prop-types';
import '../Styles/Statistics.styles.css';

const Statistics = ({
    handleEasyTasks,
    handleMediumTasks,
    handleHardTasks,
    handleCompletedTasks,
    message,
    messageColor
}) => {
    return (
        <div>
            {message === '' ? '' : <p style={{ backgroundColor: messageColor}} className='notification'>{message}</p>}
            <div className='stats'>
                <h1>Tasks Statistics:</h1>
                <div className='stat-item'>{handleEasyTasks}</div>
                <div className='stat-item'>{handleMediumTasks}</div>
                <div className='stat-item'>{handleHardTasks}</div>
                <div className='stat-item'>{handleCompletedTasks}</div>
            </div>
        </div>
    );
}

Statistics.propTypes = {
    handleEasyTasks: PropTypes.string,
    handleMediumTasks: PropTypes.string,
    handleHardTasks: PropTypes.string,
    handleCompletedTasks: PropTypes.string,
    message: PropTypes.string
};

export default Statistics;