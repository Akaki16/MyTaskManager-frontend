import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task.component';
import '../../Styles/Tasks/Tasks.styles.css';

const Tasks = ({
    tasks,
    onComplete,
    onDelete,
    showDetail
}) => {
    return (
        <section className='task-list'>
            {tasks.map(task => {
                return (
                    <Task
                        key={task.id}
                        task={task}
                        onComplete={onComplete}
                        onDelete={onDelete}
                        showDetail={showDetail}
                    />
                );
            })}
        </section>
    );
}

Tasks.propTypes = {
    tasks: PropTypes.array.isRequired
}

export default Tasks;