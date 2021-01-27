import {TaskStateType, TaskType} from '../App'
import {v1} from "uuid";
import {AddListActionType, RemoveTodoListActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: "REMOVE_TASK"
    id: string
    todoListId: string
}

export type AddTaskActionType = {
    type: "ADD_TASK"
    title: string
    todoListId: string
}

export type ChangeTaskStatusType = {
    type: "CHANGE_STATUS"
    taskId: string
    isDone: boolean
    todoListId: string
}

export type ChangeTaskTitleType = {
    type: "CHANGE_TITLE"
    taskId: string
    title: string
    todoListId: string
}

const initialState: TaskStateType = {}

type ActionType = RemoveTaskActionType | AddTaskActionType |
    ChangeTaskStatusType | ChangeTaskTitleType | AddListActionType | RemoveTodoListActionType


export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            let stateCopy = {...state}
            stateCopy[action.todoListId] = state[action.todoListId].filter(task => task.id !== action.id)
            return stateCopy
        }

        case "ADD_TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            let stateCopy = {...state}
            stateCopy[action.todoListId] = [newTask, ...state[action.todoListId]]
            return stateCopy
        }

        case "CHANGE_STATUS": {
            // let stateCopy = {...state}
            // const task = stateCopy[action.todoListId].find(t => t.id === action.taskId)
            // if (task) {
            //     task.isDone = action.isDone
            // }
            // return stateCopy
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(t => {
                        if (t.id !== action.taskId) {
                            return {...t}
                        } else {
                            return {...t, isDone: action.isDone}
                        }
                    })
            }
        }


        case "CHANGE_TITLE": {
            let stateCopy = {...state}
            const task = stateCopy[action.todoListId].find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }

        case "ADD-LIST": {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let stateCopy = {...state}
            delete stateCopy[action.todoListId]
            return stateCopy

        }

        default:
            return state
        // throw new Error("Unknown action!")

    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    // можно запросить сервак
    return {
        type: "REMOVE_TASK",
        id: taskId,
        todoListId: todoListId
    }
}

export const addTaskAC = (newTaskTitle: string, todoListId: string): AddTaskActionType => {
    return {
        type: 'ADD_TASK',
        title: newTaskTitle,
        todoListId: todoListId
    }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusType => {
    return {
        type: 'CHANGE_STATUS',
        taskId: taskId,
        isDone: isDone,
        todoListId: todoListId
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleType => {
    return {
        type: 'CHANGE_TITLE',
        taskId: taskId,
        title: title,
        todoListId: todoListId
    }
}

