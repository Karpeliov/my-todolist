import {
    todoListsReducer,
    ChangeListTitleActionType,
    RemoveTodoListAC,
    AddTodoListsAC,
    ChangeTodoListsAC, ChangeTodoListsFilterAC
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../App';

test('correct todolist should be removed', () => {
    let todoListID1 = v1();
    let todoListID2 = v1();

    const startState: Array<TodoListType> = [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, RemoveTodoListAC(todoListID1)) // с action creator, если нужен сайд эфект, например запрс на сервер. Делаем его в AC

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListID2);
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const endState = todoListsReducer(startState, { type: 'ADD-LIST', title: newTodolistTitle})
    const endState = todoListsReducer(startState,  AddTodoListsAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const action: ChangeListTitleActionType = { //или указать тип
    //     type: 'CHANGE-LIST-TITLE' as const, //или так
    //     title: newTodolistTitle,
    //     todoListId: todolistId2
    //
    // };

    // const endState = todoListsReducer(startState, action);
    const endState = todoListsReducer(startState, ChangeTodoListsAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todoListId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    // const action = {
    //     type: 'CHANGE-FILTER' as const,
    //     todoListId: todoListId2,
    //     filterValue: newFilter
    // };

    // const endState = todoListsReducer(startState, action);
    const endState = todoListsReducer(startState, ChangeTodoListsFilterAC(todoListId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

