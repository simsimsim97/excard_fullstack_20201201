import React, { useEffect, useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from './components/TaskModal';

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskSelected, setTaskSelected] = useState({});
  const [tasks, setTasks] = useState(localStorage.getItem("tasks"));

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }

  const editTask = (task) => {
    setTaskSelected(task);
    toggleModal();
  }

  const deleteTask = (taskId) => {
    let jsonTasks = JSON.parse(tasks);

    let newTasks = jsonTasks.filter(item => item.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(JSON.stringify(newTasks));
  }

  const renderHeader = () => {
    let headerElement = ['ID', 'Task', 'Desciption', 'Action']

    return headerElement.map((key, index) => {
      return <th key={index}>{key}</th>
    })
  }

  const renderBody = () => {
    let jsonTasks = JSON.parse(tasks);
    return jsonTasks.map((task) => {
      return (
        <tr key={task.id}>
          <td>{task.id}</td>
          <td>{task.name}</td>
          <td>{task.desc}</td>
          <td className='operation'>
            <button className='button' onClick={() => editTask(task)}>Edit</button>
            <button className='button' onClick={() => deleteTask(task.id)}>Delete</button>
          </td>
        </tr>
      )
    })
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <p>Enter New Task</p>
          <p><button type="button" onClick={() => toggleModal()}>Add Task</button></p>
          {tasks && JSON.parse(tasks).length > 0 &&
            <>
              <h3 id='title'>Task Records</h3>
              <table id='task'>
                <thead>
                  <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                  {renderBody()}
                </tbody>
              </table>
            </>
          }
        </header>
      </div>
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} taskSelected={taskSelected} setTaskSelected={setTaskSelected} />
    </>
  );
}

export default App;
