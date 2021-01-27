import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("AddItemForm")
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    //функция в кнопку +
    const addItem = () => {
        const trimmedTitle = title.trim()  //обрезает пробелы в начале и в конце строки
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError("Title is required!")
        }
        setTitle("")
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        //setError(null)
        if (error !== null) setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKayPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItem()
    }

    return (<div>
        <TextField value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKayPressHandler}
                   variant={"outlined"} size={"small"} error={!!error}
                   helperText={error} label={"Title"}
        />
        {/*<input*/}
        {/*    value={title}*/}
        {/*    onChange={onChangeHandler}*/}
        {/*    onKeyPress={onKayPressHandler}*/}
        {/*    className={error ? "error" : ""}*/}
        {/*/>*/}

        {/*<button onClick={addItem}>+</button>*/}
        {/*<Button variant={"contained"} color={"primary"} onClick={addItem}>+</Button>*/}
        <IconButton onClick={addItem} color={"primary"} size={"medium"}>
            <AddBox/>
        </IconButton>
        {/*{error && <div className={"error-message"}> {error} </div>}*/}
    </div>)

})