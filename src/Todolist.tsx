import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from './EditableSpan';
import Styles from './Todolist.module.css'
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListType} from "./AppWithRedux";
import {Task} from "./task";
import {TaskRedux} from "./taskRedux";

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


export const Todolist = React.memo((props: PropsType) => {

    console.log("Todolist called")
    const todoList = useSelector<AppRootStateType, Array<TodoListType>>(state =>
        state.todoLists.filter((todo) => todo.id === props.id))

    let taskForTodoList = props.tasks

    if (props.filter === "active") {
        taskForTodoList = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        taskForTodoList = props.tasks.filter(t => t.isDone === true)
    }

    // const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const taskComp = taskForTodoList.map(taskObj => {

        return (
            <Task key={taskObj.id}
                  taskId={taskObj.id}
                  title={taskObj.title}
                  todoListId={props.id}
                  isDone={taskObj.isDone}
                  removeTask={props.removeTask}
                  changeStatus={props.changeStatus}
                  changeTaskTitle={props.changeTaskTitle}/>
            // <TaskRedux key={taskObj.id}
            //            taskId={taskObj.id}
            //            todoListId={props.id}
            // />
        )
    })

    //функция в кнопку +
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    const changeListTitle = useCallback((title: string) => {
        props.changeListTitle(props.id, title)
        // на этом этаме мы уже можем передать todoListId: string,
        // который равен props.id
        // title: string получаем от EditableSpan
        // иначе пришлось бы передавать в EditableSpan props.id, чтобы вставить его там в колбэк.
        //Т.е гонять данные туда сюда
    }, [])


    return <div className={"one-list"}>
        <h2>
            <EditableSpan sendNewTitle={changeListTitle} value={props.title}/>
            <IconButton size={"medium"} onClick={() => props.removeTodoList(props.id)}> <Delete/> </IconButton>
        </h2>
        {/*<button className={"deleteListBtn"} onClick={() => props.removeTodoList(props.id)}>X</button>*/}

        <AddItemForm addItem={addTask}/>
        <ul style={{listStyleType: "none", padding: "0"}}>
            {taskComp}
        </ul>

        <div>
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
})
