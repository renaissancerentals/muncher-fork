import React from "react";
import {Meta, Story} from "@storybook/react";
import {Paper} from "./Paper";
import "./assets/Paper.stories.scss"

export default {
    title: "paper",
    component: Paper
} as Meta;

const Template: Story = () =>
    <div className="paper-story">
        <Paper><h3>This is paper</h3><p>Paper content</p></Paper>
    </div>;

export const Default = Template.bind({});
Default.args = {};
