import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}


export function AddItemForm(props: AddItemFormPropsType) {

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
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKayPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItem()
    }

    return (<div>
       <h2 className={""}></h2>
        <input
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKayPressHandler}
            className={error ? "error" : ""}
        />
        <button onClick={addItem}>+</button>
        {error && <div className={"error-message"}> {error} </div>}
    </div>)
}