import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./task";

export default {
    title: 'Todolist/Task',
    component: Task,

    argTypes: {

    },
} as Meta;

const changeTaskStatusCallback = action( 'Status changed inside Task' )
const changeTaskTitleCallback = action( "Title changed inside Task")
const removeTaskCallback = action( "Remove Button inside Task")

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    changeStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    taskId: "1",
    title: "HTML",
    todoListId: "todoListId1",
    isDone: true,
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    taskId: "2",
    title: "React",
    todoListId: "todoListId2",
    isDone: false,
};