import React, {useState} from 'react';

import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    value: string
    sendNewTitle: (title: string) => void
}


export function EditableSpan(props: EditableSpanPropsType) {
    console.log("EditableSpan")
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
            ?
            <TextField value={title}
                       autoFocus onBlur={ActivateViewMode}
                       onChange={(e) => {
                           setTitle(e.currentTarget.value)
                       }}
            />
            // <input value={title}
            //          autoFocus onBlur={ActivateViewMode}
            //          onChange={(e) => {
            //              setTitle(e.currentTarget.value)
            //          }}
            // />
            : <span onDoubleClick={ActivateEditMode}>{title}</span>
    )


}