import React, {useState} from 'react'
import './ToDoList.css'

function ToDoList() {

    const [lists, setLists] = useState([{taskName: "Task 1", done: false}, {taskName: "Task 2", done: false}, {taskName: "Task 3", done: false}]);
    const [task, setTask] = useState("");

    function handleInputChange(event) {
        console.log(task);
        setTask(event.target.value);
    }
    
    const handleEnter = (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    }

    function addTask() {
        if (!task) {
            console.log("Please enter a task!");
            return;
        }
        
        console.log(`Task added : ${task}`);
        setLists(l => [...l, {taskName: task, done: false}]);
        setTask("");
    }

    function moveUp(index) {
        if(index === 0) {
            return;
        }

        setLists(l => swapItems(l, index, index - 1));
    }

    function moveDown(index) {
        if(index === lists.length - 1) {
            return;
        }

        setLists(l => swapItems(l, index, index + 1));
    }

    function swapItems(arrayItem, fromIndex, toIndex) {
        const newArray = [...arrayItem];
        [newArray[fromIndex], newArray[toIndex]] = [newArray[toIndex], newArray[fromIndex]]
        return newArray;
    }

    function deleteTask(index) {
        setLists(lists.filter((_, i) => i !== index));
    }

    function toggleDone(index) {
        setLists(lists.map((item, i) => i === index ? {...item, done: !item.done} : item));
    }

    return(
        <div className="main-container">
            <h3 className="title">TODO LIST</h3>
            <input type='text' className='task-input' value={task} maxLength={"35"} placeholder='Enter a task...' onChange={handleInputChange} onKeyDown={handleEnter} />
            <button className='add-button' onClick={addTask}>ADD</button>
            <div className='list-container'>
                <ol>
                    {lists.map((list, index) => <li key={index}>
                                                    <span className='task-text' style={{textDecoration: list.done ? "line-through" : "none"}} onClick={() => toggleDone(index)}>{list.taskName}</span>
                                                    <button className='buttons' onClick={() => moveUp(index)}>▲</button>
                                                    <button className='buttons' onClick={() => moveDown(index)}>▼</button>
                                                    <button id='delete-button' className='buttons' onClick={() => deleteTask(index)}>𐄂</button>
                                                </li>)}
                </ol>
            </div>
        </div>
    );
}

export default ToDoList