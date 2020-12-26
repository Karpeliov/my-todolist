import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type taskStateType = {
    [key: string]: Array<TaskType>
}


function App() {
// BLL
    const todoListID1 = v1()
    const todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<taskStateType>({
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
        const todoList = todoLists.find((tl) => tl.id === todoListId)
        if (todoList) {
            todoList.filter = filterValue
            setTodoLists([...todoLists])
        }

    }

    function removeTask(taskID: string, todoListId: string) {
        tasks[todoListId] = tasks[todoListId].filter(task => task.id !== taskID)
        // const filteredTasks = tasks.filter(task => task.id !== taskID) так было когда task был массивом, а сейчас объект
        setTasks({...tasks})
    }

    function addTask(title: string, todoListId: string) {

        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        // tasks[todoListId] = [newTask, ...tasks[todoListId]]  попробовать так
        tasks[todoListId].unshift(newTask)
        setTasks({...tasks})

    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        const task = tasks[todoListId].find(t => t.id === taskId)
        // псевдоложь (false) = все пустые значения: undefined, 0, -0, null, "", NaN
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(title: string, taskId: string, todoListId: string) {
        const task = tasks[todoListId].find(t => t.id === taskId)
        if (task) {
            task.title = title
            setTasks({...tasks})
            console.log(tasks)
        }
    }

    function changeListTitle(todoListId: string, title: string) {
        const todoList = todoLists.find((tl) => tl.id === todoListId)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }


    function removeTodoList(todoListId: string) {
        todoLists = todoLists.filter((tl) => tl.id !== todoListId)
        setTodoLists(todoLists)
    }

    function addList(title: string) {
        const newID = v1()
        const newTitle = title
        setTodoLists([...todoLists, {id: newID, title: newTitle, filter: "all"}])
        setTasks({...tasks, [newID]: []})
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
                                    <Paper elevation={7} style={{padding: "15px", backgroundColor: "#e7ffff", borderRadius: "10px"}} >
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

export default App;
