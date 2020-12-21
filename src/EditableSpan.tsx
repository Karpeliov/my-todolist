import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TaskType} from './App';

type EditableSpanPropsType = {
    value: string
    sendNewTitle: (title: string) => void
}


export function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.value)

    const ActivateEditMode = () => {
        setEditMode(true)
    }

    const ActivateViewMode = () => {
        setEditMode(false)
        if (title.trim()) {
            props.sendNewTitle(title.trim())
        }
    }


    return (editMode
            ? <input value={title}
                     autoFocus onBlur={ActivateViewMode}
                     onChange={(e) => {
                         setTitle(e.currentTarget.value)
                     }}
            />
            : <span onDoubleClick={ActivateEditMode}>{title}</span>
    )


}