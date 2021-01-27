import {
    todoListsReducer,
    ChangeListTitleActionType,
    RemoveTodoListAC,
    AddTodoListsAC,
    ChangeTodoListsAC, ChangeTodoListsFilterAC
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../App';

let todoListID1: string
let todoListID2: string
let startState: Array<TodoListType> = []

beforeEach(() => {
    todoListID1 = v1();
    todoListID2 = v1();

    startState =  [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {


    const endState = todoListsReducer(startState, RemoveTodoListAC(todoListID1)) // с action creator, если нужен сайд эфект, например запрс на сервер. Делаем его в AC

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListID2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";



    // const endState = todoListsReducer(startState, { type: 'ADD-LIST', title: newTodolistTitle})
    const endState = todoListsReducer(startState, AddTodoListsAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";



    // const action: ChangeListTitleActionType = { //или указать тип
    //     type: 'CHANGE-LIST-TITLE' as const, //или так
    //     title: newTodolistTitle,
    //     todoListId: todolistId2
    //
    // };

    // const endState = todoListsReducer(startState, action);
    const endState = todoListsReducer(startState, ChangeTodoListsAC(newTodolistTitle, todoListID2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    // const action = {
    //     type: 'CHANGE-FILTER' as const,
    //     todoListId: todoListId2,
    //     filterValue: newFilter
    // };

    // const endState = todoListsReducer(startState, action);
    const endState = todoListsReducer(startState, ChangeTodoListsFilterAC(todoListID2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

