import React from "react";
import {Meta, Story} from "@storybook/react";
import {CommunityContactSection, CommunityContactSectionProps} from "./CommunityContactSection";

export default {
    title: "Section/Community Contact",
    component: CommunityContactSection
} as Meta;

const Template: Story<CommunityContactSectionProps> = (args) => {
    return (
        <CommunityContactSection {...args}/>
    );
};
export const Default = Template.bind({});

Default.args = {
    communityId: "covenanter-hill",
}
export const Long = Template.bind({});
Long.args = {
    ...Default.args,
    variant: "long"
}