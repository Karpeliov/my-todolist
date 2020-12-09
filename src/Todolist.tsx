import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

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

}

export function Todolist(props: PropsType) {

    // для импута. Изначально пустая строка. Вписанное записывается в setTitle,
    // а потом записывается в title
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const tasks = props.tasks.map(taskObj => {
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(taskObj.id, e.currentTarget.checked, props.id)
        }
        return (
            <li key={taskObj.id} className={taskObj.isDone ? "is-Done" : ""}>
                <input onChange={changeStatus} type="checkbox" checked={taskObj.isDone}/>
                <span>{taskObj.title}</span>
                <button onClick={() => {
                    props.removeTask(taskObj.id, props.id)
                }}>x
                </button>
            </li>
        )
    })

    //функция в кнопку +
    const addTask = () => {
        const trimmedTitle = title.trim()  //обрезает пробелы в начале и в конце строки
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.id)

        } else {
            setError("Title is required!")

        }
        setTitle("")
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKayPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addTask()
    }

    return <div className={"one-list"}>
        <h3>{props.title}
            <button onClick={() => props.removeTodoList(props.id)}>Delete This List</button>
        </h3>
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKayPressHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={"error-message"}> {error} </div>}
        </div>
        <ul>
            {tasks}
        </ul>
        <div>
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
