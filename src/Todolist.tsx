import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from './EditableSpan';
import Styles from './Todolist.module.css'
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete, DeleteForever, DeleteOutline} from "@material-ui/icons";

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

    // const [title, setTitle] = useState<string>("")
    // const [error, setError] = useState<string | null>(null)


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

            <li key={taskObj.id} className={taskObj.isDone ? Styles.isDone : Styles.tasks} style={{margin: "0"}}>
                <Checkbox size={"small"} color={"primary"} onChange={changeStatus} checked={taskObj.isDone}/>
                {/*<input onChange={changeStatus} type="checkbox" checked={taskObj.isDone}/>*/}
                <EditableSpan value={taskObj.title} sendNewTitle={changeTaskTitle}/>
                {/*<span>{taskObj.title}</span>*/}
                <IconButton className={"deleteTask"} onClick={onClickHandler}> <Delete/> </IconButton>
                {/*<button className={"deleteTask"} onClick={onClickHandler}>x*/}
                {/*</button>*/}
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
        <h2>
            <EditableSpan sendNewTitle={changeListTitle} value={props.title}/>
            <IconButton size={"medium"} onClick={() => props.removeTodoList(props.id)}> <Delete/> </IconButton>
        </h2>
        {/*<button className={"deleteListBtn"} onClick={() => props.removeTodoList(props.id)}>X</button>*/}

        <AddItemForm addItem={addTask}/>
        <ul style={{listStyleType: "none", padding: "0"}}>
            {tasks}
        </ul>

        <div >
            <ButtonGroup size={"medium"} color={"primary"}>
                <Button // className={(props.filter === "all") ? "active-filter" : ""}
                    variant={(props.filter === "all") ? "outlined" : "contained"}
                    // color={"default"}
                    onClick={() => {
                        props.changeFilter("all", props.id)
                    }}>
                    All
                </Button>
                <Button // className={(props.filter === "active") ? "active-filter" : ""}
                    variant={(props.filter === "active") ? "outlined" : "contained"}
                    // color={"secondary"}
                    onClick={() => {
                        props.changeFilter("active", props.id)
                    }}>
                    Active
                </Button>
                <Button //className={(props.filter === "completed") ? "active-filter" : ""}
                    variant={(props.filter === "completed") ? "outlined" : "contained"}
                    // color={"primary"}
                    onClick={() => {
                        props.changeFilter("completed", props.id)
                    }}>
                    Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
}


