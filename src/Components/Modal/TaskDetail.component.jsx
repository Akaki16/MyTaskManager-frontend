import React from 'react';
import '../../Styles/Modal/TaskDetail.styles.css';

const TaskDetail = ({
    task,
    closeModal,
    taskModalDisplay
}) => {
    const { title, duration, difficulty, description } = task;
    return (
        <div style={{ display: taskModalDisplay }} className='modal'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h1>Task Detail</h1>
                    <img onClick={closeModal} src="https://img.icons8.com/color/48/000000/delete-sign--v1.png" alt='close-icon' />
                </div>
                <hr />
                <br />
                <div className='task-modal-body'>
                    <h2>{title}</h2>
                    <h3>{duration}</h3>
                    <h4>{difficulty}</h4>
                    <article>
                        <p>{description}</p>
                    </article>
                </div>
                <br />
                <div className='task-modal-footer'>
                    <button onClick={closeModal} type='button'>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskDetail;