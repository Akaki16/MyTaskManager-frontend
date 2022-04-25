import React from 'react';
import '../../Styles/Modal/AddTask.styles.css';
import PropTypes from 'prop-types';

const AddTask = ({
    modalDisplay,
    onCloseModal,
    onSubmitTask,
    taskTitle,
    onTaskTitleChange,
    taskDuration,
    onTaskDurationChange,
    taskDifficulty,
    onTaskDifficultyChange,
    taskDescription,
    onTaskDescriptionChange
}) => {
    return (
        <div style={{ display: modalDisplay }} className='modal'>
            <div className="modal-content">
                <div className="modal-header">
                    <h1>Add Task</h1>
                    <img onClick={onCloseModal} src="https://img.icons8.com/color/48/000000/delete-sign--v1.png" alt='close-icon' />
                </div>
                <hr />
                <br />
                <div className="modal-body">
                    <form onSubmit={onSubmitTask}>
                        <div className='form-group'>
                            <label htmlFor='task_title'>Task Title</label>
                            <input
                                type='text'
                                autoComplete='off'
                                autoFocus
                                id='task_title'
                                placeholder='Enter a task title'
                                value={taskTitle}
                                onChange={onTaskTitleChange}
                                minLength={10}
                                maxLength={100}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='task_duration'>Task Duration</label>
                            <select value={taskDuration} onChange={onTaskDurationChange} id='task_duration' required>
                                <option value="" disabled>Select task duration</option>
                                <option value='1 Day'>1 Day</option>
                                <option value='1 Week'>1 Week</option>
                                <option value='2 Weeks'>2 Weeks</option>
                                <option value='3 Weeks'>3 Weeks</option>
                                <option value='4 Weeks'>4 Weeks</option>
                                <option value='More than a month'>More than a month</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='task_difficulty'>Task Difficulty</label>
                            <select value={taskDifficulty} onChange={onTaskDifficultyChange}  id='task_difficulty' required>
                                <option value='Easy'>Easy</option>
                                <option value='Medium'>Medium</option>
                                <option value='Hard'>Hard</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='task_description'>Task Description</label>
                            <textarea value={taskDescription} onChange={onTaskDescriptionChange} id='task_description' placeholder='Enter a task description' minLength={50} maxLength={500} required></textarea>
                        </div>
                        <br />
                        <div className='modal-footer'>
                            <button type='submit'>
                                Submit
                            </button>
                            <button onClick={onCloseModal} type='button'>
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

AddTask.defaultProps = {
    modalDisplay: 'none'
};

AddTask.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    onSubmitTask: PropTypes.func.isRequired,
    taskTitle: PropTypes.string.isRequired,
    onTaskTitleChange: PropTypes.func.isRequired,
    taskDuration: PropTypes.string.isRequired,
    onTaskDurationChange: PropTypes.func.isRequired,
    taskDifficulty: PropTypes.string.isRequired,
    onTaskDifficultyChange: PropTypes.func.isRequired,
    taskDescription: PropTypes.string.isRequired,
    onTaskDescriptionChange: PropTypes.func.isRequired
};

export default AddTask;