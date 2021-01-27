import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {changeTaskStatusAC, removeTaskAC, addTaskAC, changeTaskTitleAC} from './state/tasks-reducer';
import {
    AddTodoListsAC,
    ChangeTodoListsAC,
    ChangeTodoListsFilterAC,
    RemoveTodoListAC,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type taskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
// BLL
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, taskStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const changeFilter = useCallback((filterValue: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodoListsFilterAC(todoListId, filterValue))
    }, [dispatch])

    const removeTask = useCallback((taskID: string, todoListId: string) => {
        dispatch(removeTaskAC(taskID, todoListId))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }, [dispatch])

    const changeStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }, [dispatch])

    const changeTaskTitle = useCallback((title: string, taskId: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todoListId))
    }, [dispatch])

    const changeListTitle = useCallback((todoListId: string, title: string) => {
        dispatch(ChangeTodoListsAC(todoListId, title))
    }, [dispatch])

    const removeTodoList = useCallback((todoListId: string) => {
        let action = RemoveTodoListAC(todoListId)
        dispatch(action)
    }, [dispatch])

    const addList = useCallback((title: string) => {
        let action = AddTodoListsAC(title)
        dispatch(action)
    }, [dispatch])

    return (
        <div className="App">
            <AppBar position={"sticky"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed={true}>
                <Grid container={true} style={{padding: "15px"}}>
                    <AddItemForm addItem={addList}/>
                </Grid>
                <Grid container={true} spacing={5}>
                    {
                        todoLists.map((t) => {

                            return (
                                <Grid item key={t.id}>
                                    <Paper elevation={7}
                                           style={{padding: "15px", backgroundColor: "#e7ffff", borderRadius: "10px"}}>
                                        <Todolist
                                            key={t.id}
                                            id={t.id}
                                            title={t.title}
                                            tasks={tasks[t.id]}
                                            filter={t.filter}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeListTitle={changeListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                {/*<button onClick={() => addList()}>+</button>*/}
            </Container>
        </div>
    );
}

export default AppWithRedux;
