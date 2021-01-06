import {FilterValuesType, TodoListType} from '../App'
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    todoListId: string
}

export type AddListActionType = {
    type: "ADD-LIST"
    title: string
    todolistId: string
}

export type ChangeListTitleActionType = {
    type: "CHANGE-LIST-TITLE"
    title: string
    todoListId: string
}

export type ChangeFilter = {
    type: "CHANGE-FILTER"
    filterValue: FilterValuesType
    todoListId: string
}

type ActionType = RemoveTodoListActionType | AddListActionType |
    ChangeListTitleActionType | ChangeFilter

export const todoListsReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter((tl) => tl.id !== action.todoListId)
        case "ADD-LIST":
            const newID = action.todolistId // сделали так, чтобы при добавлении нового листа у него была та же id
            // const newID = v1() // так было
            const newTitle = action.title
            return [...state, {id: newID, title: newTitle, filter: "all"}]
        case "CHANGE-LIST-TITLE":
            const todoList = state.find((tl) => tl.id === action.todoListId)
            if (todoList) {
                todoList.title = action.title
                return ([...state])
            }
            return state
        case "CHANGE-FILTER": {
            const todoList = state.find((tl) => tl.id === action.todoListId)
            if (todoList) {
                todoList.filter = action.filterValue
                return ([...state])
            }
        }
        default:
            //return state
            throw new Error("Unknown action!")
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListActionType => {
    // можно запросить сервак
    return {
        type: "REMOVE-TODOLIST",
        todoListId: todoListID
    }
}

export const AddTodoListsAC = (newTodolistTitle: string): AddListActionType => {
    return {
        type: 'ADD-LIST',
        title: newTodolistTitle,
        todolistId: v1()
}
}

export const ChangeTodoListsAC = (newTodolistTitle: string, todolistId: string): ChangeListTitleActionType => {
    return {
        type: 'CHANGE-LIST-TITLE',
        title: newTodolistTitle,
        todoListId: todolistId
    }
}

export const ChangeTodoListsFilterAC = (todoListId: string, filterValue: FilterValuesType): ChangeFilter => {
    return {
        type: 'CHANGE-FILTER',
        todoListId: todoListId,
        filterValue: filterValue
    }
}