import {userReducer} from './user-reducer';
// Jest
test('user reducer should increment only age', () => {
    const startState = {age: 20, childrenNumber: 2, name: 'Dimych'};

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21);
    expect(endState.childrenNumber).toBe(2);
});

test('user reducer should increment only childrenNumber', () => {
    const startState = {age: 20, childrenNumber: 2, name: 'Dimych'};

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-NUMBER'})

    expect(endState.age).toBe(20);
    expect(endState.childrenNumber).toBe(3);
});

test('user reducer should change only the name', () => {
    const startState = {age: 20, childrenNumber: 2, name: 'Dimych'};

    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: 'Sasha'})

    expect(endState.name).toBe("Sasha")
    expect(endState.age).toBe(20);
    expect(endState.childrenNumber).toBe(2);
});

