import React, {ChangeEvent} from "react";
import Styles from "./Todolist.module.css";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";

export type TaskPropsType = {
    taskId: string
    title: string
    todoListId: string
    isDone: boolean
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTask: (taskID: string, todoListId: string) => void
    changeTaskTitle: (title: string, taskId: string, todoListId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.taskId, e.currentTarget.checked, props.todoListId)
    }
    const onClickHandler = () => {
        props.removeTask(props.taskId, props.todoListId)
    }
    const changeTaskTitle = (title: string) => {
        props.changeTaskTitle(title, props.taskId, props.todoListId)
    }

    return <li key={props.taskId} className={props.isDone ? Styles.isDone : Styles.tasks} style={{margin: "0"}}>
        <Checkbox size={"small"} color={"primary"} onChange={changeStatus} checked={props.isDone}/>
        {/*<input onChange={changeStatus} type="checkbox" checked={taskObj.isDone}/>*/}
        <EditableSpan value={props.title} sendNewTitle={changeTaskTitle}/>
        {/*<span>{taskObj.title}</span>*/}
        <IconButton className={"deleteTask"} onClick={onClickHandler}> <Delete/> </IconButton>
        {/*<button className={"deleteTask"} onClick={onClickHandler}>x*/}
        {/*</button>*/}
    </li>
})