import React from "react";
import {Meta, Story} from "@storybook/react";
import {ApplicationSection, ApplicationSectionProps} from "./ApplicationSection";

export default {
    title: "Section/Application",
    component: ApplicationSection
} as Meta;
const Template: Story<ApplicationSectionProps> = (args) => <ApplicationSection {...args} />;

export const Default = Template.bind({});
Default.args = {
    contactLink: "/contact"
}
export const WithCommunity = Template.bind({});

WithCommunity.args = {
    ...Default.args,
    community: "HighGrove"
}