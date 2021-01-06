export type StateType = {
    name: string
    age: number
    childrenNumber: number
}

// 3 типа действий: action type!
// Описание (тип) действия и (возможно) какие-то параметры

type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case "INCREMENT-AGE":
            return {...state, age: state.age + 1}
        case "INCREMENT-CHILDREN-NUMBER":
            return {...state, childrenNumber: state.childrenNumber + 1}
        case "CHANGE-NAME":
            return {...state, name: action.newName}
        default:
            //return state
            throw new Error("Unknown action!")

    }

}
