import React from 'react';
import PropTypes from 'prop-types';
import '../../Styles/Tasks/Task.styles.css';

const Task = ({
    task,
    onComplete,
    onDelete,
    showDetail
}) => {
    const { title, description, completed } = task;
    return (
        <div style={{ backgroundColor: completed ? 'rgb(46, 102, 99)' : 'rgb(44, 43, 56)' }} className='task'>
            <h1>{title}</h1>
            <br />
            <article>
                <p>{description.substring(0, 30)}...</p>
            </article>
            <br />
            <div className='task-footer'>
                <button onClick={() => onComplete(task.id)} type='button'>{completed ? 'Not Complete' : 'Complete'}</button>
                <button onClick={() => onDelete(task.id)} type='button'>Delete</button>
                <button onClick={() => showDetail(task.id)} type='button'>Details</button>
            </div>
        </div>
    );
}

Task.propTypes = {
    task: PropTypes.object.isRequired
};

export default Task;