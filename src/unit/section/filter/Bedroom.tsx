import React from "react";
import {Checkbox} from "@contentmunch/muncher-ui";
import {DropDownFilter} from "../../filter/UnitDropDown";

export const sortBedrooms = (a: number, b: number): number => (a - b);
export const BedroomFilter: React.FC<BedroomFilterProps> = ({filters, handleFilterChange, currentFilters}) => {

    return (
        <DropDownFilter label="Bedroom">
            {Array.from(filters.keys()).sort(sortBedrooms).map(filter => (
                <Checkbox key={"bedroom-" + filter}
                          label={filter.toString()}
                          name={"bedroom-" + filter}
                          onChange={() => {
                              handleFilterChange(filter)
                          }}
                          checked={() => currentFilters.indexOf(filter) > -1}
                />
            ))}
        </DropDownFilter>
    );
};

export interface BedroomFilterProps {
    filters: Set<number>;
    handleFilterChange: (filter: number) => void;
    currentFilters: number[];
}