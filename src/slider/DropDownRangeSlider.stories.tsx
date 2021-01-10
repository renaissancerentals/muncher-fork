import React, {useState} from "react";
import {Meta, Story} from "@storybook/react";
import {RangeSlider, RangeSliderProps} from "./RangeSlider";
import {DropdownButton} from "../button/DropdownButton";
import "./assets/SliderStories.scss";

export default {
    title: 'Input/Dropdown Range Slider',
    component: DropdownButton
} as Meta;

const Template: Story<RangeSliderProps> = (args) => {
    const [showContent, setShowContent] = useState(false);
    const [minValue, setMinValue] = useState(20);
    const [maxValue, setMaxValue] = useState(600);
    return (
        <div className="slider-stories">
            <DropdownButton showContent={showContent} setShowContent={setShowContent}
                            element={"slider(min: " + minValue + " max: " + maxValue + ")"}>
                <RangeSlider {...args} min={1} max={1000}
                             minValue={minValue} maxValue={maxValue}
                             setMinValue={setMinValue} setMaxValue={setMaxValue}
                             numberFormatter={num => new Intl.NumberFormat('en-UK', {
                                 style: 'currency',
                                 currency: 'GBP'
                             }).format(num)}
                />
            </DropdownButton>
        </div>
    );
}
export const Default = Template.bind({});

