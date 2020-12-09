import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

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

    // const [filter, setFilter] = useState<FilterValuesType>("all")

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

    function removeTodoList(todoListId: string) {
        todoLists = todoLists.filter((tl) => tl.id !== todoListId)
        setTodoLists(todoLists)
    }

    function addList() {
        const newID = v1()
        const newTitle = "New ToDoList"
        setTodoLists([...todoLists, {id: newID, title: newTitle, filter: "all"}])
        setTasks({...tasks, [newID]: []})
        // console.log(tasks)
        // console.log(todoLists)
    }

    return (
        <div className="Main-container">
        <div className="App">
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
                        />

                        /*под каким названием передаём функцию removeTask (и др.)  в Todolist*/
                    )
                })
            }
            <button onClick={() => addList()}>+</button>
        </div>
        </div>
    );
}

export default App;
