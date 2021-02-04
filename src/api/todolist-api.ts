import axios from "axios";

const settings = {
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '1143676e-9d4d-40a0-840d-de43f38528fd'
    }
}

const instance = axios.create({
    ...settings,

})

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type BaseResponseType<D = {}> = {
    addedDate: string
    order: number
    title: string
    data: D
}

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },
    createTodolist() {
        return instance.post<BaseResponseType<{ item: TodolistType }>>(`todo-lists`, {title: "REACT"})
    },
    getTodolists() {
        return instance.get<Array<TodolistType>>(`todo-lists`)
    }
}