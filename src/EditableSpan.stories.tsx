import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./task";
import {EditableSpan, EditableSpanPropsType} from './EditableSpan';

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,

    argTypes: {

    },
} as Meta;

const sendNewTitleCallback = action( "Send new title")

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;



export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
 sendNewTitle: sendNewTitleCallback,
    value: "Title"
};



