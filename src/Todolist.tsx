import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from './EditableSpan';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListId: string) => void
    changeFilter: (filterValue: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (title: string, taskId: string, todoListId: string) => void
    changeListTitle: (todoListId: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)


    const tasks = props.tasks.map(taskObj => {
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(taskObj.id, e.currentTarget.checked, props.id)
        }
        const onClickHandler = () => {
            props.removeTask(taskObj.id, props.id)
        }
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(title, taskObj.id, props.id)
        }

        return (

            <li key={taskObj.id} className={taskObj.isDone ? "is-Done" : "tasks"}>
                <input onChange={changeStatus} type="checkbox" checked={taskObj.isDone}/>
                <EditableSpan value={taskObj.title} sendNewTitle={changeTaskTitle}/>
                {/*<span>{taskObj.title}</span>*/}
                <button className={"deleteTask"} onClick={onClickHandler}>x
                </button>
            </li>
        )
    })

    //функция в кнопку +
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeListTitle = (title: string) => {
        props.changeListTitle(props.id, title)
        // на этом этаме мы уже можем передать todoListId: string,
        // который равен props.id
        // title: string получаем от EditableSpan
        // иначе пришлось бы передавать в EditableSpan props.id, чтобы вставить его там в колбэк.
        //Т.е гонять данные туда сюда
    }

    return <div className={"one-list"}>
        <h3>
            <EditableSpan sendNewTitle={changeListTitle} value={props.title}/>

        </h3>
        <button className={"deleteListBtn"} onClick={() => props.removeTodoList(props.id)}>X</button>
        <AddItemForm addItem={addTask}/>
        <ul >
            {tasks}
        </ul>

        <div className={"filter-buttons"}>
            <button className={(props.filter === "all") ? "active-filter" : ""} onClick={() => {
                props.changeFilter("all", props.id)
            }}>All
            </button>
            <button className={(props.filter === "active") ? "active-filter" : ""} onClick={() => {
                props.changeFilter("active", props.id)
            }}>Active
            </button>
            <button className={(props.filter === "completed") ? "active-filter" : ""} onClick={() => {
                props.changeFilter("completed", props.id)
            }}>Completed
            </button>
        </div>
    </div>
}

export default Todolist;
