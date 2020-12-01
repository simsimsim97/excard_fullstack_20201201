import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';

/**
 * Author : Sim
 */
const TaskModal = props => {
    const modalVisible = props.modalVisible;
    const setModalVisible = props.setModalVisible;
    const taskSelected = props.taskSelected;
    const setTaskSelected = props.setTaskSelected;

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(() => {
        if (taskSelected) {
            setId(taskSelected.id);
            setName(taskSelected.name);
            setDesc(taskSelected.desc);
        }
    }, [taskSelected])

    const saveTask = (name, desc) => {
        var taskInStorage = JSON.parse(localStorage.getItem("tasks"));

        var data = { "name": name, "desc": desc };
        var tasks = [];

        if (taskInStorage.length == 0) {
            data = { ...data, ['id']: 1 };
            tasks[0] = data;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        } else {
            var lastId = taskInStorage[taskInStorage.length - 1].id;
            var id = lastId + 1;
            data = { ...data, ['id']: id };

            tasks = [...taskInStorage, data];
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        closeModalAction();
    }

    const updateTask = (id, name, desc) => {
        let storageTasks = JSON.parse(localStorage.getItem("tasks"));
        let updatedTasks = storageTasks.map(task => (task.id == id ? Object.assign({}, task, { id, name, desc }) : task));
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));     

        closeModalAction();
    }

    const handleSubmit = (e) => {
        if (name == '' || desc == '') {
            alert("Please fill in all the fields");
        } else {
            if (id == undefined) {
                saveTask(name, desc);
            } else {
                updateTask(id, name, desc);
            }
        }
        // e.preventDefault();
    }

    const closeModalAction = () => {
        setName('');
        setDesc('');
        setTaskSelected({});
        setModalVisible(!modalVisible);
    }

    return (
        <Modal
            show={modalVisible} onHide={() => closeModalAction()} animation={true}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Tasks
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <input type="id" name="id" defaultValue={taskSelected && taskSelected.name} defaultValue={taskSelected && taskSelected.id} hidden /><br />
                    <label>
                        <span class="text">Task Name</span>
                        <input type="name" name="name" onChange={(e) => setName(e.target.value)} defaultValue={taskSelected && taskSelected.name} /><br />
                    </label>
                    <br />
                    <label>
                        <span class="text">Task Desc.</span>
                        <input type="desc" name="desc" onChange={(e) => setDesc(e.target.value)} defaultValue={taskSelected && taskSelected.desc} /><br />
                    </label><br />
                    <div class="align-right">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default TaskModal;
