import React, {ChangeEvent} from "react";
import Styles from "./Todolist.module.css";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

export type TaskPropsType = {
    taskId: string
    todoListId: string
}

export const TaskRedux = React.memo((props: TaskPropsType) => {

    const taskUseSelector = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todoListId].filter(t => t.id === props.taskId)[0])

    const dispatch = useDispatch()

    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.taskId, e.currentTarget.checked, props.todoListId))
    }
    const onClickHandler = () => {
        dispatch(removeTaskAC(props.taskId, props.todoListId))
    }
    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(props.taskId, title, props.todoListId))
    }

    return <li key={props.taskId} className={taskUseSelector.isDone ? Styles.isDone : Styles.tasks} style={{margin: "0"}}>
        <Checkbox size={"small"} color={"primary"} onChange={changeStatus} checked={taskUseSelector.isDone}/>
        {/*<input onChange={changeStatus} type="checkbox" checked={taskObj.isDone}/>*/}
        <EditableSpan value={taskUseSelector.title} sendNewTitle={changeTaskTitle}/>
        {/*<span>{taskObj.title}</span>*/}
        <IconButton className={"deleteTask"} onClick={onClickHandler}> <Delete/> </IconButton>
        {/*<button className={"deleteTask"} onClick={onClickHandler}>x*/}
        {/*</button>*/}
    </li>
})