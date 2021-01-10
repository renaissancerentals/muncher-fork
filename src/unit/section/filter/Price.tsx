import React from "react";
import {defaultMaxRent, defaultMinRent} from "../../data/Unit";
import { RangeSlider} from "@contentmunch/muncher-ui";
import {DropDownFilter} from "../../filter/UnitDropDown";

export const PriceFilter: React.FC<PriceFilterProps> = ({minValue, maxValue, setMinValue, setMaxValue,}) => {

    return (
        <div className="price-dropdown">
            <DropDownFilter label="Price" drop="middle">
                <div className="price-dropdown-content">
                    <RangeSlider
                        min={defaultMinRent}
                        max={defaultMaxRent}
                        setMaxValue={setMaxValue}
                        setMinValue={setMinValue}
                        minValue={minValue}
                        maxValue={maxValue}
                    />
                </div>
            </DropDownFilter>
        </div>
    );
};

export interface PriceFilterProps {
    minValue: number;
    maxValue: number;
    setMinValue: (num: number) => void;
    setMaxValue: (num: number) => void;
}