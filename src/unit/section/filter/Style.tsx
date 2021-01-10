import React from "react";
import {Checkbox} from "@contentmunch/muncher-ui";
import {DropDownFilter} from "../../filter/UnitDropDown";

export const StyleFilter: React.FC<StyleFilterProps> = ({filters, handleFilterChange, currentFilters}) => {

    return (
        <DropDownFilter label="Home Type">
            {Array.from(filters.keys()).map((filter: string) => (
                <Checkbox key={filter} label={filter} name={filter}
                          onChange={() => {
                              handleFilterChange(filter)
                          }}
                          checked={() => currentFilters.indexOf(filter) > -1}
                />
            ))}
        </DropDownFilter>
    );
};

export interface StyleFilterProps {
    filters: Set<string>;
    handleFilterChange: (filter: string) => void;
    currentFilters: string[];
}