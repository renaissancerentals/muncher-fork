import React, {useState} from "react";
import "./assets/UnitsHeader.scss";
import "../filter/assets/UnitDropDown.scss";
import {Icon, Pill, Range} from "@contentmunch/muncher-ui";

import {CurrentFilters, SortBy, UnitFilters} from "../data/UnitFilters";
import {defaultMaxRent, defaultMinRent, Unit} from "../data/Unit";
import {BedroomFilter, sortBedrooms} from "./filter/Bedroom";
import {sortAndFilter} from "../service/UnitService";
import {Month} from "../data/Calendar";
import {AvailabilityFilter, sortAvailability} from "./filter/Availability";
import {PriceFilter} from "./filter/Price";
import {StyleFilter} from "./filter/Style";
import {Sort} from "./filter/Sort";

export const UnitsHeader: React.FC<UnitsHeaderProps> = ({title, filters, units, setCurrentUnits, isCondensed, currentUnitsCount}) => {

    const [bedroomFilters, setBedroomFilters] = useState<number[]>([]);
    const [availabilityFilters, setAvailabilityFilters] = useState<Month[]>([]);
    const [styleFilters, setStyleFilters] = useState<string[]>([]);
    const [minRent, setMinRent] = useState<number>(defaultMinRent);
    const [maxRent, setMaxRent] = useState<number>(defaultMaxRent);
    const [sortBy, setSortBy] = useState<SortBy>("featured");

    const currentFilters: CurrentFilters = {
        bedroomFilters, availabilityFilters, styleFilters, minRent, maxRent, sortBy
    };

    const handleSortAndFilter = (withCurrentFilters: CurrentFilters) => {
        setCurrentUnits(sortAndFilter(units, withCurrentFilters));
    };
    const handleBedroomFilterChange = (filter: number) => {
        const index = bedroomFilters.indexOf(filter);
        const currentBedroomFilters = [...bedroomFilters];
        if (index > -1) {
            currentBedroomFilters.splice(index, 1);
        } else {
            currentBedroomFilters.push(filter);
        }
        setBedroomFilters(currentBedroomFilters);
        handleSortAndFilter({...currentFilters, bedroomFilters: currentBedroomFilters});
    };
    const handleAvailabilityFilterChange = (filter: Month) => {
        const index = availabilityFilters.indexOf(filter);
        const currentAvailabilityFilters = [...availabilityFilters];
        if (index > -1) {
            currentAvailabilityFilters.splice(index, 1);
        } else {
            currentAvailabilityFilters.push(filter);
        }
        setAvailabilityFilters(currentAvailabilityFilters);
        handleSortAndFilter({...currentFilters, availabilityFilters: currentAvailabilityFilters});
    };
    const handlePriceChange = (range: Range) => {
        setMinRent(range.min);
        setMaxRent(range.max);
        handleSortAndFilter({...currentFilters, minRent: range.min, maxRent: range.max});
    }
    const handleStyleFilterChange = (filter: string) => {
        const index = styleFilters.indexOf(filter);
        const currentSyleFilters = [...styleFilters];
        if (index > -1) {
            currentSyleFilters.splice(index, 1);
        } else {
            currentSyleFilters.push(filter);
        }
        setStyleFilters(currentSyleFilters);
        handleSortAndFilter({...currentFilters, styleFilters: currentSyleFilters});
    };
    const handleSortChange = (sortBy: SortBy) => {
        setSortBy(sortBy);
        handleSortAndFilter({...currentFilters, sortBy: sortBy});
    }
    return (
        <header className="units-header">
            <div className={isCondensed ? "" : "container"}>
                <h2>{title}</h2>
                <div className="units-filters">
                    <div className="filter-group">
                        <label className="filter-label">Filter By:</label>
                        <div className="filters">
                            <BedroomFilter filters={filters.bedroom} handleFilterChange={handleBedroomFilterChange}
                                           currentFilters={bedroomFilters}/>
                            <AvailabilityFilter filters={filters.availability}
                                                handleFilterChange={handleAvailabilityFilterChange}
                                                currentFilters={availabilityFilters}/>

                            <PriceFilter minValue={minRent} maxValue={maxRent} setMinValue={setMinRent}
                                         setMaxValue={setMaxRent}/>
                            <StyleFilter filters={filters.style} handleFilterChange={handleStyleFilterChange}
                                         currentFilters={styleFilters}
                            />
                        </div>
                    </div>
                    <div className="filter-group">
                        <label className="filter-label">Sort By:</label>
                        <div className="filters">
                            <Sort sortBy={sortBy} handleSortChange={handleSortChange}/>
                        </div>
                    </div>
                </div>
                <div className="pills">
                    {bedroomFilters.sort(sortBedrooms).map(bedroom => (
                        <Pill key={bedroom} pillCloseHandler={() => {
                            handleBedroomFilterChange(bedroom)
                        }}>
                            {bedroom + " bedroom"}
                        </Pill>
                    ))}
                    {availabilityFilters.sort(sortAvailability).map((availability: Month) => (
                        <Pill key={availability.toString()} pillCloseHandler={() => {
                            handleAvailabilityFilterChange(availability)
                        }}>
                            {availability.toString() + " availability"}
                        </Pill>
                    ))}
                    {
                        minRent === defaultMinRent && maxRent === defaultMaxRent ? "" :
                            <Pill key="rent" pillCloseHandler={() => {
                                handlePriceChange({
                                    min: defaultMinRent,
                                    max: defaultMaxRent
                                })
                            }}>
                                {"$" + minRent + " - $" + maxRent}
                            </Pill>
                    }
                    {styleFilters.map(style => (
                        <Pill key={style} pillCloseHandler={() => {
                            handleStyleFilterChange(style)
                        }}>
                            {style}
                        </Pill>
                    ))}
                    <div className="filter-result">
                        <Icon name="filter"/>&nbsp;Total: {currentUnitsCount} Results
                    </div>

                </div>
            </div>
        </header>
    );
}

export interface UnitsHeaderProps {
    title?: string;
    filters: UnitFilters;
    units: Unit[];
    setCurrentUnits: (units: Unit[]) => void;
    isCondensed?: boolean;
    currentUnitsCount: number;
}