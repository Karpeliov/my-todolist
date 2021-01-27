import React, {useState, useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {changeTaskStatusAC, removeTaskAC, tasksReducer, addTaskAC, changeTaskTitleAC} from './state/tasks-reducer';
import {
    AddTodoListsAC,
    ChangeTodoListsAC,
    ChangeTodoListsFilterAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";

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


function AppWithReducers() {
// BLL
    const todoListID1 = v1()
    const todoListID2 = v1()

    let [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "TypeScript", isDone: true},
            {id: v1(), title: "O_o", isDone: false}
        ],

        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Pepsi", isDone: false},
            {id: v1(), title: "Tosts", isDone: false},
        ]

    })

    function changeFilter(filterValue: FilterValuesType, todoListId: string) {
        dispatchToTodoLists(ChangeTodoListsFilterAC(todoListId, filterValue))

    }

    function removeTask(taskID: string, todoListId: string) {
        dispatchToTasks(removeTaskAC(taskID, todoListId))
    }

    function addTask(title: string, todoListId: string) {
        dispatchToTasks(addTaskAC(title, todoListId))

    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListId))
    }

    function changeTaskTitle(title: string, taskId: string, todoListId: string) {
        dispatchToTasks(changeTaskTitleAC(taskId, title, todoListId))
    }

    function changeListTitle(todoListId: string, title: string) {
        dispatchToTodoLists(ChangeTodoListsAC(todoListId, title))
    }

    function removeTodoList(todoListId: string) {
        let action = RemoveTodoListAC(todoListId)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    function addList(title: string) {
        let action = AddTodoListsAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

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
                            let taskForTodoList = tasks[t.id]
                            if (t.filter === "active") {
                                taskForTodoList = tasks[t.id].filter(task => !task.isDone) // тоже самое что task.isDone === false
                            }
                            if (t.filter === "completed") {
                                taskForTodoList = tasks[t.id].filter(task => task.isDone)
                            }
                            return (
                                <Grid item>
                                    <Paper elevation={7}
                                           style={{padding: "15px", backgroundColor: "#e7ffff", borderRadius: "10px"}}>
                                        <Todolist
                                            key={t.id}
                                            id={t.id}
                                            title={t.title}
                                            tasks={taskForTodoList}
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

export default AppWithReducers;
