import React, { useState, useEffect, useRef } from 'react';
import taskService from './Services/taskService';
import Header from './Components/Header.component';
import AddTask from './Components/Modal/AddTask.component';
import Tasks from './Components/Tasks/Tasks.component';
import Statistics from './Components/Statistics.component';
import Filter from './Components/Filter.component';
import Message from './Components/Message.component';
import TaskDetail from './Components/Modal/TaskDetail.component';
import Loader from './Components/Modal/Loader.component';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDuration, setTaskDuration] = useState('');
  const [taskDifficulty, setTaskDifficulty] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [foundTask, setFoundTask] = useState([]);
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  const loaderRef = useRef(HTMLDivElement);

  let easyTasks;
  let mediumTasks;
  let hardTasks;
  let completedTasks;

  // filter tasks based on their difficulty level
  easyTasks = tasks.filter(task => task.difficulty.toLowerCase() === 'easy');
  mediumTasks = tasks.filter(task => task.difficulty.toLowerCase() === 'medium');
  hardTasks = tasks.filter(task => task.difficulty.toLowerCase() === 'hard');
  completedTasks = tasks.filter(task => task.completed === true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const TASKS = await taskService.getAll();
        setTasks(TASKS.data);
      } catch {
        alert('For some unexpected reasons tasks could not be retrieved');
      }
    }

    fetchTasks();
  }, []);

  useEffect(() => {
    function showLoader() {
      if (tasks.length === 0) {
        loaderRef.current.style.display = 'block';
      } else {
        loaderRef.current.style.display = 'none';
      }
    }

    showLoader();
  }, [tasks]);

  useEffect(() => {
    function handleKeyDown(event) {
      switch (event.key) {
        case 'Escape':
          setIsModalOpen(false);
          setIsTaskModalOpen(false);
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const modalDisplay = isModalOpen ? 'block' : 'none';
  const taskModalDisplay = isTaskModalOpen ? 'block' : 'none';

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const clearFormFields = () => {
    setTaskTitle('');
    setTaskDuration('');
    setTaskDescription('');
  }

  const onSubmitTask = async (event) => {
    event.preventDefault();

    const task = {
      title: taskTitle,
      duration: taskDuration,
      difficulty: taskDifficulty,
      description: taskDescription,
      completed: false,
    };

    try {
      const request = await taskService.create(task);
      setTasks([...tasks, request.data]);
      setMessage('New Task was created, if you cannot see it refresh the browser and you will be able to view it.');
      setMessageColor('rgb(63, 128, 124)');
      // after 4 seconds clear the message
      setTimeout(() => {
        setMessage('');
        setMessageColor('');
      }, 4000);
    } catch {
      alert('For some unexpected reasons, new task could not be created, Try again.');
    }

    setIsModalOpen(false);
    clearFormFields();
  }

  const deleteTask = async (id) => {
    try {
      await taskService.deleteObject(id);
      setTasks(tasks.filter(task => task.id !== id));
      setFilteredTasks(filteredTasks.filter(fTask => fTask.id !== id));
      setMessage('Task was deleted successfuly');
      setMessageColor('rgb(145, 82, 82)');
      // after 4 seconds clear the message
      setTimeout(() => {
        setMessage('');
        setMessageColor('');
      }, 4000);
    } catch {
      alert('For some unexpected reasons, this task could not be deleted, Try again.');
    }
  }

  const completeTask = async (id) => {
    // find task based on its id
    const task = tasks.find(task => task.id === id);
    // copy all properties of old task and update is completed status
    const changedTask = {...task, completed: !task.completed};
    try {
      const request = await taskService.update(id, changedTask);
      // update tasks
      setTasks(tasks.map(task => task.id !== id ? task : request.data));
      setMessage('Task was updated, if you cannot see the changes refresh the browser and you will be able to see');
      setMessageColor('rgb(63, 128, 124)');
      // after 4 seconds clear the message
      setTimeout(() => {
        setMessage('');
        setMessageColor('');
      }, 4000);
    } catch {
      alert('For some unexpected reasons, this task could not be completed, Try again.');
    }
  }

  const filterTasks = (e) => {
    // get filter value
    const filterValue = e.target.value.toLowerCase();
    // filter tasks based on their difficulty level
    let filtered_tasks = tasks.filter(task => {
      return task.difficulty.toLowerCase() === filterValue;
    });
    if (filterValue === 'all') {
      filtered_tasks = tasks;
    }
    // update filtered tasks
    setFilteredTasks(filtered_tasks);
  }

  const filterCompletedTasks = () => {
    const completedTasks = tasks.filter(task => task.completed === true);
    setFilteredTasks(completedTasks);
  }

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    const searchedTasks = tasks.filter(task => {
      return task.title.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredTasks(searchedTasks);
  }

  const showTaskDetails = (id) => {
    const task = tasks.find(task => task.id === id);
    setFoundTask(task);
    setIsTaskModalOpen(true);
  }

  return (
    <div>
      <Header onModalOpen={openModal} />
      <AddTask
        modalDisplay={modalDisplay}
        onCloseModal={closeModal}
        taskTitle={taskTitle}
        taskDuration={taskDuration}
        taskDifficulty={taskDifficulty}
        taskDescription={taskDescription}
        onTaskTitleChange={(e) => setTaskTitle(e.target.value)}
        onTaskDurationChange={(e) => setTaskDuration(e.target.value)}
        onTaskDifficultyChange={(e) => setTaskDifficulty(e.target.value)}
        onTaskDescriptionChange={(e) => setTaskDescription(e.target.value)}
        onSubmitTask={onSubmitTask}
      />
      <Statistics
        handleEasyTasks={`Easy: ${easyTasks.length}`}
        handleMediumTasks={`Medium: ${mediumTasks.length}`}
        handleHardTasks={`Hard: ${hardTasks.length}`}
        handleCompletedTasks={`Completed: ${completedTasks.length}`}
        message={message}
        messageColor={messageColor}
      />
      <Filter
        handleFilter={filterTasks}
        handleFilteringCompletedTasks={filterCompletedTasks}
        searchValue={searchValue}
        onSearchValueChange={(e) => setSearchValue(e.target.value)}
        handleSearch={handleSearch}
      />
      {searchValue === '' ? '' : <Message text={`Found ${filteredTasks.length} results for "${searchValue}"`} />}
      <Tasks
        tasks={filteredTasks.length > 0 ? filteredTasks : tasks}
        onDelete={deleteTask}
        onComplete={completeTask}
        showDetail={showTaskDetails}
      />
      <TaskDetail
        task={foundTask}
        closeModal={() => setIsTaskModalOpen(false)}
        taskModalDisplay={taskModalDisplay}
      />
      <Loader loaderRef={loaderRef} />
    </div>
  );
}

export default App;